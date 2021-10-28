import fl from 'fantasy-land'
import { concat, defaultTo, equals, map, omit, pipe, propOr, reduce, unless } from 'ramda'
import { isArray } from 'ramda-adjunct'

export enum Strategy {
  Depth,
  Breadth
}

export class Queue<T> extends Array<T> {
  pop(): T | undefined {
    return super.shift()
  }

  push(...items: T[]): number {
    return super.push(...items.reverse())
  }
}

type TreeFrom<O, CP extends keyof O, VP extends keyof O | undefined> = VP extends undefined
  ? TreeNode<Omit<O, CP>>
  : TreeNode<O[CP]>

export class TreeNode<T> {
  constructor(public value: T, public children: TreeNode<T>[]) {}

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
  static from =
    <O>(childrenProp: keyof O & string, valueProp?: keyof O & string) =>
    (obj: O): TreeFrom<O, typeof childrenProp, typeof valueProp> => {
      const value = valueProp ? obj[valueProp] : omit([childrenProp], obj)
      const children = pipe(
        propOr([], childrenProp),
        unless(isArray, defaultTo([])),
        map(TreeNode.from(childrenProp, valueProp))
      )(obj)
      return TreeNode.of<any>(value, children)
    }

  flatten = (strategy: Strategy = Strategy.Breadth): T[] => {
    const arr =
      strategy === Strategy.Depth ? Array.of<TreeNode<T>>(this) : Queue.of<TreeNode<T>>(this)
    const res = Array.of<T>()
    while (arr.length > 0) {
      const el = arr.pop()!
      res.push(el.value)
      arr.push(...el.children.reverse())
    }
    return res
  };

  [fl.reduce] = <R>(fn: (acc: R, c: T) => R, acc: R) => reduce(fn, acc, this.flatten())
  reduce = this[fl.reduce];

  [fl.zero] = () => TreeNode.of(null, [])
  zero = this[fl.zero];

  [fl.equals] = <R>(that: TreeNode<T>) =>
    equals(this.value, that.value) && equals(this.children, that.children)
  equals = this[fl.equals];

  [fl.concat] = (...nodes: TreeNode<T>[]) => TreeNode.of(this.value, concat(this.children)(nodes))
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
