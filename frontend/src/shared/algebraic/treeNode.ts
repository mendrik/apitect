import * as fl from 'fantasy-land'
import {
  concat,
  defaultTo,
  equals,
  findIndex,
  map,
  omit,
  pipe,
  Pred,
  prop,
  propOr,
  reduce,
  T as RT,
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

export class TreeNode<T> {
  public parent?: TreeNode<T>
  private constructor(public value: T, public children: TreeNode<T>[]) {
    children.forEach(c => (c.parent = this))
  }

  [fl.map] = <R>(fn: (v: T) => R): TreeNode<R> =>
    TreeNode.of<R>(
      fn(this.value),
      map(c => c[fl.map](fn), this.children)
    )
  map = this[fl.map];

  [fl.extract] = (): T => ({
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
    (obj: O) => {
      const value = valueProp != null ? obj[valueProp!] : omit([childrenProp as string], obj)
      const children: TreeNode<O[NonNullable<VP>] | Omit<O, string>>[] = pipe(
        propOr([], childrenProp as string),
        unless(isArray, defaultTo([])),
        map(TreeNode.from<O, CP, VP>(childrenProp, valueProp))
      )(obj)
      return TreeNode.of(value, children)
    }

  flatten = (strategy: Strategy = Strategy.Breadth): TreeNode<T>[] => {
    const arr =
      strategy === Strategy.Depth ? Array.of<TreeNode<T>>(this) : Queue.of<TreeNode<T>>(this)
    const res = Array.of<TreeNode<T>>()
    while (arr.length > 0) {
      const el = arr.shift()!
      res.push(el)
      arr.unshift(...el.children)
    }
    return res
  }

  toArray = (strategy: Strategy = Strategy.Breadth): T[] =>
    this.flatten(strategy).map(prop('value'));

  [fl.reduce] = <R>(fn: (acc: R, c: T) => R, acc: R) =>
    reduce(fn, acc, this.toArray(Strategy.Depth))
  reduce = this[fl.reduce];

  [fl.zero] = () => TreeNode.of(null, [])
  zero = this[fl.zero];

  [fl.equals] = <R>(that: TreeNode<T>): boolean =>
    equals(this.value, that.value) && equals(this.children, that.children)
  equals = this[fl.equals];

  [fl.concat] = (...nodes: TreeNode<T>[]): TreeNode<T> =>
    TreeNode.of(this.value, concat(this.children)(nodes))
  concat = this[fl.concat];

  [fl.filter] = (pred: (v: T) => boolean): Maybe<TreeNode<T>> =>
    pred(this.value)
      ? TreeNode.of(
          this.value,
          this.children.filter(n => n.filter(pred))
        )
      : undefined
  filter = this[fl.filter]

  first = (pred: (v: T) => boolean): Maybe<TreeNode<T>> =>
    this.flatten(Strategy.Depth).find(node => pred(node.value))

  closest = (pred: (v: T) => boolean): Maybe<TreeNode<T>> =>
    this.$pathToRoot().find(node => pred(node.value))

  $pathToRoot = (): TreeNode<T>[] =>
    this.parent ? [this.parent].concat(...this.parent.$pathToRoot()) : []

  pathToRoot = (): T[] => this.$pathToRoot().map(prop('value'))

  insert = (underNodePred: (v: T) => boolean, v: T, position?: number): ChildOperation<T> => {
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

  delete = (pred: (v: T) => boolean): ChildOperation<T> => {
    const node = this.first(pred)
    if (node?.parent != null) {
      const children = node.parent.children
      const position = findIndex<TreeNode<T>>(n => pred(n.value))(children)
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

  update = (pred: (v: T) => boolean, fn: (v: T) => T): ChildOperation<T> => {
    const node = this.first(pred)
    if (node?.parent != null) {
      const children = node.parent.children
      const position = findIndex<TreeNode<T>>(n => pred(n.value))(children)
      if (position !== -1) {
        const newNode = TreeNode.of<T>(fn(children[position].value), children[position].children)
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

  get root(): TreeNode<T> {
    return this.$pathToRoot().pop()!
  }

  next = (
    pred: Pred = RT,
    isEqual: Pred = equals(this),
    strategy: Strategy = Strategy.Depth
  ): Maybe<TreeNode<T>> => $next(isEqual)(this.root.flatten(strategy).slice(1).filter(pred))

  prev = (
    pred: Pred = RT,
    isEqual: Pred = equals(this),
    strategy: Strategy = Strategy.Depth
  ): Maybe<TreeNode<T>> => $prev(isEqual)(this.root.flatten(strategy).slice(1).filter(pred))

  toString = () =>
    JSON.stringify(
      this,
      (key, value) => (key === 'parent' || isFunction(value) ? undefined : value),
      2
    )
}
