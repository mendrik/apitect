import fl from 'fantasy-land'
import { apply, eqBy, equals, invoker, map, prop, propOr } from 'ramda'

type TreeNodeValue = {
  [fl.equals]: (that: TreeNodeValue) => boolean
  [fl.lte]: (that: TreeNodeValue) => boolean
}

type Func<T extends TreeNodeValue> = (x: T) => T

export class TreeNode<T extends TreeNodeValue> {
  constructor(public value: T, public children: TreeNode<T>[]) {}

  [fl.equals] = ({ value, children }: TreeNode<T>): boolean =>
    equals(this.value, value) &&
    eqBy(propOr(0, 'length')) &&
    this.children.every((child: TreeNode<T>, i: number) => child[fl.equals](children[i]));

  [fl.lte] = ({ value, children }: TreeNode<T>): boolean =>
    this.value[fl.lte](value)
      ? this.value[fl.equals](value)
        ? this.children[fl.lte](children)
        : true
      : false;

  [fl.map] = (f: Func<T>) => new TreeNode(f(this.value), map(apply(fl.map), this.children.map));

  [fl.reduce] = (f: Func<T>, acc) =>
    this.children.reduce((acc, rt) => rt[fl.reduce](f, acc), f(acc, this.value));

  [fl.traverse] = (T, f: Func<T>) =>
    this.children[fl.traverse](T, f)[fl.ap](f(this.value).map(v => cs => new TreeNode(v, cs)))
}
