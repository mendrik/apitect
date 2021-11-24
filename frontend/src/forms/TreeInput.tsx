import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { always, cond, not, propEq, propOr } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, {
  createContext,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'
import { Overlay } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { DeleteIcon } from '../components/generic/DeleteIcon'
import { Scrollable } from '../components/generic/Scrollable'
import { Scale, Tuple } from '../components/generic/Tuple'
import {
  NodeNode,
  NodeSelector,
  NodeTree,
  OverlayStub,
  Selected,
  StyledTreeInput
} from '../css/TreeInput.css'
import { useFocusOutside } from '../hooks/useFocusOutside'
import { useOnActivate } from '../hooks/useOnActivate'
import { SetAccess, useSet } from '../hooks/useSet'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Jsx, Maybe } from '../shared/types/generic'
import { offset, sameWidth } from '../utils/sameWidthMod'
import { stopPropagation as sp } from '../utils/stopPropagation'
import { ErrorInfo } from './ErrorInfo'
import { TextInput } from './TextInput'

type TreeSelectConfig<T> = {
  name: string
  onSelect: (node: Maybe<T>) => void
  nodeRender: (node: T) => ReactNode
  selectionFilter: (node: TreeNode<T>) => boolean
}

type OwnProps<T> = {
  tree: TreeNode<T>
  label: TFuncKey
  containerClasses: string
} & TreeSelectConfig<T> &
  HTMLAttributes<HTMLDivElement>

const TreeInputContext = createContext<
  TreeSelectConfig<any> & {
    setShow: Dispatch<SetStateAction<boolean>>
    setSelected: Dispatch<SetStateAction<any>>
    focusedNodeState: [Maybe<TreeNode<any>>, Dispatch<SetStateAction<Maybe<TreeNode<any>>>>]
    openStates: SetAccess<HTMLSpanElement>
  }
>({} as any)

export const TreeInput = <T extends any>({
  tree,
  label,
  name,
  onSelect,
  containerClasses,
  children,
  selectionFilter,
  nodeRender,
  ...props
}: Jsx<OwnProps<T>>) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<Maybe<T>>()

  const focusedNodeState = useState<Maybe<TreeNode<T>>>()
  const openStates = useSet<HTMLSpanElement>()

  const target = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const keyMap = cond([
    [propEq('code', 'Enter'), sp(() => setShow(not))],
    [propEq('code', 'Space'), sp(() => setShow(not))],
    [
      propEq('code', 'Escape'),
      sp(() => {
        setShow(false)
        const el = target.current?.firstElementChild as Maybe<HTMLElement>
        el?.focus()
      })
    ]
  ])

  useFocusOutside(target, () => setShow(false))

  return (
    <StyledTreeInput
      ref={target}
      onKeyDown={keyMap}
      className={clsx('form-floating', containerClasses)}
      {...props}
    >
      <Selected className="form-select" tabIndex={0} onClick={() => setShow(not)}>
        {selected && nodeRender(selected)}
      </Selected>
      <DeleteIcon
        onPointerDown={() => {
          setSelected(undefined)
          onSelect(undefined)
          setShow(false)
        }}
      />
      <OverlayStub ref={container} />
      <Overlay
        target={target}
        container={container}
        popperConfig={{ modifiers: [offset, sameWidth] }}
        flip
        show={show}
        placement="bottom-start"
      >
        <NodeSelector hidden={!show}>
          <div className="p-2">
            <TextInput label="form.fields.search" name="search" />
          </div>
          <TreeInputContext.Provider
            value={{
              openStates,
              focusedNodeState,
              setSelected,
              setShow,
              nodeRender,
              name,
              onSelect,
              selectionFilter
            }}
          >
            <Scrollable fade style={{ height: 300 }}>
              <NodeTree>
                {mapIndexed(
                  child => (
                    <TreeInput.Node<T> node={child} key={propOr('', 'id', child.value)} />
                  ),
                  tree.children
                )}
              </NodeTree>
            </Scrollable>
          </TreeInputContext.Provider>
        </NodeSelector>
      </Overlay>
      <label>{t(label)}</label>
      <ErrorInfo name={name} />
    </StyledTreeInput>
  )
}

type TreeNodeProps<T> = {
  node: TreeNode<T>
}

TreeInput.Node = <T extends any>({ node }: Jsx<TreeNodeProps<T>>) => {
  const {
    nodeRender,
    onSelect,
    selectionFilter,
    setShow,
    setSelected,
    focusedNodeState,
    openStates
  } = useContext(TreeInputContext)
  const [focusedNode, setFocusedNode] = focusedNodeState
  const { add, remove, has } = openStates
  const hasChildren = isNotNilOrEmpty(node.children)

  const nameRef = useOnActivate<HTMLSpanElement>(() => {
    onSelect(node)
    setSelected(node.value)
    setShow(false)
  })

  const visible = !!nameRef.current && has(nameRef.current)

  const keyMap = cond([
    [propEq('code', 'ArrowDown'), sp(() => focusedNode?.next(always(visible)))],
    [propEq('code', 'ArrowUp'), sp(() => focusedNode?.prev(always(visible)))],
    [propEq('code', 'ArrowLeft'), sp(() => remove(nameRef.current!))],
    [propEq('code', 'ArrowRight'), sp(() => add(nameRef.current!))]
  ])

  return (
    <NodeNode
      onKeyDown={keyMap}
      data-depth={node.depth}
      data-children={hasChildren}
      className={clsx({ thick: visible })}
    >
      <Tuple first={Scale.CONTENT} second={Scale.MAX}>
        {hasChildren ? (
          <div
            className="icn"
            onClick={() => (visible ? remove(nameRef.current!) : add(nameRef.current!))}
          >
            <IconChevronRight
              stroke={1}
              width={16}
              height={16}
              className={clsx('rotate', { deg90: visible })}
            />
          </div>
        ) : (
          <div className="icn" />
        )}
        <span
          tabIndex={0}
          onFocus={() => setFocusedNode(node)}
          className="name"
          ref={!selectionFilter || selectionFilter(node) ? nameRef : undefined}
        >
          {nodeRender(node.value)}
        </span>
      </Tuple>
      {hasChildren && (
        <ul hidden={!visible}>
          {mapIndexed(
            child => (
              <TreeInput.Node<T> node={child} key={propOr('', 'id', child.value)} />
            ),
            node.children
          )}
        </ul>
      )}
    </NodeNode>
  )
}
