import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { all, cond, not, propEq, propOr, T as RT } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, {
  createContext,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'
import { FormControl, Overlay } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { DeleteIcon } from '../components/generic/DeleteIcon'
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
import { SetAccess, useSet } from '../hooks/useSet'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Fn, Jsx, Maybe } from '../shared/types/generic'
import { offset, sameWidth } from '../utils/sameWidthMod'
import { stopPropagation as sp } from '../utils/stopPropagation'
import { ErrorInfo } from './ErrorInfo'

type WithId = { id: string }

type TreeSelectConfig<T extends WithId> = {
  name: string
  nodeRender: (node: T) => ReactNode
  selectionFilter?: (node: TreeNode<T>) => boolean
}

type OwnProps<T extends WithId> = {
  tree: TreeNode<T>
  label: TFuncKey
  containerClasses: string
} & TreeSelectConfig<T>

const TreeInputContext = createContext<
  TreeSelectConfig<any> & {
    setSelected: Dispatch<SetStateAction<any>>
    focusedNodeState: [Maybe<TreeNode<any>>, Dispatch<SetStateAction<Maybe<TreeNode<any>>>>]
    openStates: SetAccess<TreeNode<any>>
    close: Fn
  }
>({} as any)

export const TreeInput = <T extends WithId>({
  tree,
  label,
  name,
  containerClasses,
  selectionFilter = RT,
  nodeRender,
  ...props
}: Jsx<OwnProps<T>>) => {
  const { setValue, getValues } = useFormContext()
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<Maybe<T>>(
    () => tree.first(propEq('id', getValues(name)))?.value
  )

  const focusedNodeState = useState<Maybe<TreeNode<T>>>()
  const openStates = useSet<TreeNode<T>>(new Set([tree]))

  const target = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const close = sp(() => {
    const el = target.current?.firstElementChild as Maybe<HTMLElement>
    el?.focus()
    setShow(false)
  })

  const keyMap = cond([
    [propEq('code', 'Enter'), sp(() => setShow(not))],
    [propEq('code', 'Space'), sp(() => setShow(not))],
    [propEq('code', 'Escape'), close]
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
          setValue(name, undefined)
          setShow(false)
        }}
      />
      <OverlayStub ref={container} />
      <Overlay
        target={target}
        container={container}
        popperConfig={{ modifiers: [offset, sameWidth] }}
        show={show}
        placement="bottom-start"
      >
        <NodeSelector hidden={!show}>
          <div className="mx-2">
            <FormControl
              className="w-100 m-auto mt-2"
              size="sm"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <TreeInputContext.Provider
            value={{
              close,
              openStates,
              focusedNodeState,
              setSelected,
              nodeRender,
              name,
              selectionFilter
            }}
          >
            <NodeTree>
              {mapIndexed(
                child => (
                  <TreeInput.Node<T> node={child} key={propOr('', 'id', child.value)} />
                ),
                tree.children
              )}
            </NodeTree>
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

TreeInput.Node = <T extends WithId>({ node }: Jsx<TreeNodeProps<T>>) => {
  const { name, close, nodeRender, setSelected, focusedNodeState, openStates } =
    useContext(TreeInputContext)
  const { setValue } = useFormContext()
  const { add, remove, has: isOpen } = openStates
  const [focusedNode, setFocusedNode] = focusedNodeState
  const hasChildren = isNotNilOrEmpty(node.children)

  const activate = (ev: MouseEvent) => {
    setValue(name, node.value.id)
    setSelected(node.value)
    close(ev)
  }

  const isVisible = (n: TreeNode<T>) => all(isOpen, n.$pathToRoot())

  const focus = (method: 'next' | 'prev') =>
    sp(() => {
      const id = focusedNode?.[method](isVisible)?.value.id
      document.getElementById(`${name}-${id}`)?.focus()
    })

  const keyMap = cond([
    [propEq('code', 'ArrowDown'), focus('next')],
    [propEq('code', 'ArrowUp'), focus('prev')],
    [propEq('code', 'ArrowLeft'), sp(() => remove(node))],
    [propEq('code', 'ArrowRight'), sp(() => add(node))],
    [propEq('key', 'Enter'), sp(activate)],
    [propEq('code', 'Space'), sp(activate)]
  ])

  return (
    <NodeNode
      onKeyDown={keyMap}
      data-depth={node.depth}
      data-children={hasChildren}
      className={clsx({ thick: isOpen(node) })}
    >
      <Tuple
        onFocus={() => setFocusedNode(node)}
        first={Scale.CONTENT}
        second={Scale.MAX}
        tabIndex={0}
        id={`${name}-${node.value.id}`}
        onClick={activate}
      >
        {hasChildren ? (
          <div className="icn" onClick={sp(() => (isOpen(node) ? remove(node) : add(node)))}>
            <IconChevronRight
              stroke={1}
              width={16}
              height={16}
              className={clsx('rotate', { deg90: isOpen(node) })}
            />
          </div>
        ) : (
          <div className="icn" />
        )}
        <span className="name">{nodeRender(node.value)}</span>
      </Tuple>
      {hasChildren && (
        <ul hidden={!isOpen(node)}>
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
