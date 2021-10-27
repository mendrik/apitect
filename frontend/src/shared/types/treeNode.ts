import fl from 'fantasy-land'
import { map } from 'ramda'

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

export class TreeNode<T> {
  constructor(public value: T, public children: TreeNode<T>[]) {}

  [fl.map] = <R>(fn: (v: T) => R): TreeNode<R> =>
    new TreeNode<R>(
      fn(this.value),
      map(c => c[fl.map](fn), this.children)
    )
  map = this[fl.map]

  static [fl.of] = <ST>(value: ST, children: TreeNode<ST>[] = []) =>
    new TreeNode<ST>(value, children)
  static of = TreeNode[fl.of]

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
  }
}
