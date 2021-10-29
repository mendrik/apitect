import fl from 'fantasy-land'
import { concat, defaultTo, equals, map, omit, pipe, propOr, reduce, unless } from 'ramda'
import { isArray } from 'ramda-adjunct'

export enum Strategy {
  Depth,
  Breadth
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
  private constructor(public value: T, public children: TreeNode<T>[]) {}

  [fl.extract] = () => this.value
  extract = [fl.extract];

  [fl.map] = <R>(fn: (v: T) => R): TreeNode<R> =>
    new TreeNode<R>(
      fn(this.value),
      map(c => c[fl.map](fn), this.children)
    )
  map = this[fl.map]

  static [fl.of] = <ST>(value: ST, children: TreeNode<ST>[] = []) =>
    new TreeNode<ST>(value, children)
  static of = TreeNode[fl.of]

  static basedOn =
    <O, CP extends keyof O, VP extends keyof O | undefined = undefined>(
      childrenProp: CP,
      valueProp?: VP
    ) =>
    <O2 extends O>(
      obj: O2
    ): VP extends undefined
      ? TreeNode<Omit<O, typeof childrenProp>>
      : TreeNode<O[NonNullable<VP>]> => {
      const value = valueProp != null ? obj[valueProp!] : omit([childrenProp as string], obj)
      const children = pipe(
        propOr([], childrenProp as string),
        unless(isArray, defaultTo([])),
        map(TreeNode.basedOn<O, CP, VP>(childrenProp, valueProp))
      )(obj)
      return TreeNode.of(value, children as TreeNode<any>[]) as any
    }

  flatten = (strategy: Strategy = Strategy.Breadth): T[] => {
    const arr =
      strategy === Strategy.Depth ? Array.of<TreeNode<T>>(this) : Queue.of<TreeNode<T>>(this)
    const res = Array.of<T>()
    while (arr.length > 0) {
      const el = arr.shift()!
      res.push(el.value)
      arr.unshift(...el.children)
    }
    return res
  };

  [fl.reduce] = <R>(fn: (acc: R, c: T) => R, acc: R) => reduce(fn, acc, this.flatten())
  reduce = this[fl.reduce];

  [fl.zero] = () => TreeNode.of(null, [])
  zero = this[fl.zero];

  [fl.equals] = <R>(that: TreeNode<T>): boolean =>
    equals(this.value, that.value) && equals(this.children, that.children)
  equals = this[fl.equals];

  [fl.concat] = (...nodes: TreeNode<T>[]): TreeNode<T> =>
    TreeNode.of(this.value, concat(this.children)(nodes))
  concat = this[fl.concat];

  [fl.filter] = (pred: (v: T) => boolean): TreeNode<T> | undefined =>
    pred(this.value)
      ? TreeNode.of(
          this.value,
          this.children.filter(n => pred(n.value))
        )
      : undefined
  filter = this[fl.filter]
}
