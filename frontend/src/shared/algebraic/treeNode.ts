import * as fl from 'fantasy-land'
import {
  concat,
  defaultTo,
  equals,
  findIndex,
  head,
  last,
  map,
  omit,
  pipe,
  Pred,
  prop,
  propOr,
  reduce,
  T,
  unless
} from 'ramda'
import { isArray, isFunction } from 'ramda-adjunct'

import { Maybe } from '../types/generic'
import { next as $next, prev as $prev } from '../utils/ramda'

export enum Strategy {
  Depth,
  Breadth
}

export type ChildOperation<T> = {
  self: TreeNode<T>
  parent: T
  node: T
  position?: number
}

export class Queue<T> extends Array<T> {
  shift(): T | undefined {
    return super.pop()
  }

  unshift(...items: T[]): number {
    return super.unshift(...items.reverse())
  }
}

export class TreeNode<N> {
  public parent?: TreeNode<N>
  private constructor(public value: N, public children: TreeNode<N>[]) {
    children.forEach(c => (c.parent = this))
  }

  [fl.map] = <R>(fn: (v: N) => R): TreeNode<R> =>
    TreeNode.of<R>(
      fn(this.value),
      map(c => c[fl.map](fn), this.children)
    )
  map = this[fl.map];

  [fl.extract] = (): N => ({
    ...this.value,
    children: this.children.map(c => c[fl.extract]())
  })
  extract = this[fl.extract]

  static [fl.of] = <ST>(value: ST, children: TreeNode<ST>[] = []) =>
    new TreeNode<ST>(value, children)
  static of = TreeNode[fl.of]

  static from =
    <O, CP extends keyof O, VP extends keyof O | undefined = undefined>(
      childrenProp: CP,
      valueProp?: VP
    ) =>
    <O2 extends O>(obj: O2): VP extends undefined ? TreeNode<O> : TreeNode<O[NonNullable<VP>]> => {
      const value = valueProp != null ? obj[valueProp!] : omit([childrenProp as string], obj)
      const children = pipe(
        propOr([], childrenProp as string),
        unless(isArray, defaultTo([])),
        map(TreeNode.from<O, CP, VP>(childrenProp, valueProp))
      )(obj)
      return TreeNode.of(value, children as TreeNode<any>[]) as any
    }

  flatten = (strategy: Strategy = Strategy.Breadth): TreeNode<N>[] => {
    const arr =
      strategy === Strategy.Depth ? Array.of<TreeNode<N>>(this) : Queue.of<TreeNode<N>>(this)
    const res = Array.of<TreeNode<N>>()
    while (arr.length > 0) {
      const el = arr.shift()!
      res.push(el)
      arr.unshift(...el.children)
    }
    return res
  }

  toArray = (strategy: Strategy = Strategy.Breadth): N[] =>
    this.flatten(strategy).map(prop('value'));

  [fl.reduce] = <R>(fn: (acc: R, c: N) => R, acc: R) =>
    reduce(fn, acc, this.toArray(Strategy.Depth))
  reduce = this[fl.reduce];

  [fl.zero] = () => TreeNode.of(null, [])
  zero = this[fl.zero];

  [fl.equals] = (that: TreeNode<N>): boolean =>
    equals(this.value, that.value) && equals(this.children, that.children)
  equals = this[fl.equals];

  [fl.concat] = (...nodes: TreeNode<N>[]): TreeNode<N> =>
    TreeNode.of(this.value, concat(this.children)(nodes))
  concat = this[fl.concat];

  [fl.filter] = (pred: (v: N) => boolean): Maybe<TreeNode<N>> =>
    pred(this.value)
      ? TreeNode.of(
          this.value,
          this.children.filter(n => n.filter(pred))
        )
      : undefined
  filter = this[fl.filter]

  first = (pred: (v: N) => boolean): Maybe<TreeNode<N>> =>
    this.flatten(Strategy.Depth).find(node => pred(node.value))

  closest = (pred: (v: N) => boolean): Maybe<TreeNode<N>> =>
    this.$pathToRoot().find(node => pred(node.value))

  $pathToRoot = (): TreeNode<N>[] =>
    this.parent ? [this.parent].concat(...this.parent.$pathToRoot()) : []

  pathToRoot = (): N[] => this.$pathToRoot().map(prop('value'))

  insert = (underNodePred: (v: N) => boolean, v: N, position?: number): ChildOperation<N> => {
    const parent = this.first(underNodePred) ?? this
    const node = TreeNode.of(v)
    if (position) {
      parent.children.splice(position, 0, node)
    } else {
      parent.children.push(node)
    }
    return {
      self: this,
      parent: parent.value,
      node: v,
      position
    }
  }

  delete = (pred: (v: N) => boolean): ChildOperation<N> => {
    const node = this.first(pred)
    if (node?.parent != null) {
      const children = node.parent.children
      const position = findIndex<TreeNode<N>>(n => pred(n.value))(children)
      if (position !== -1) {
        const del = children.splice(position, 1)
        return {
          self: this,
          parent: node.parent.value,
          node: del[0].value,
          position
        }
      }
    }
    throw Error('Update needs a valid node')
  }

  update = (pred: (v: N) => boolean, fn: (v: N) => N): ChildOperation<N> => {
    const node = this.first(pred)
    if (node?.parent != null) {
      const children = node.parent.children
      const position = findIndex<TreeNode<N>>(n => pred(n.value))(children)
      if (position !== -1) {
        const newNode = TreeNode.of<N>(fn(children[position].value), children[position].children)
        children.splice(position, 1, newNode)
        return {
          self: this,
          parent: node.parent.value,
          node: newNode.value,
          position
        }
      }
    }
    throw Error('Update needs a valid node')
  }

  get depth(): number {
    return this.parent != null ? this.parent.depth + 1 : 0
  }

  get root(): TreeNode<N> {
    return this.$pathToRoot().pop()!
  }

  get isLast(): boolean {
    return this.parent ? last(this.parent.children) === this : true
  }

  get isFirst(): boolean {
    return this.parent ? head(this.parent.children) === this : true
  }

  next = (
    skipRoot = true,
    pred: Pred = T,
    isEqual: Pred = equals(this),
    strategy: Strategy = Strategy.Depth
  ): Maybe<TreeNode<N>> =>
    $next(isEqual)(
      this.root
        .flatten(strategy)
        .slice(skipRoot ? 1 : 0)
        .filter(pred)
    )

  prev = (
    skipRoot = true,
    pred: Pred = T,
    isEqual: Pred = equals(this),
    strategy: Strategy = Strategy.Depth
  ): Maybe<TreeNode<N>> =>
    $prev(isEqual)(
      this.root
        .flatten(strategy)
        .slice(skipRoot ? 1 : 0)
        .filter(pred)
    )

  toString = () =>
    JSON.stringify(
      this,
      (key, value) => (key === 'parent' || isFunction(value) ? undefined : value),
      2
    )
}
