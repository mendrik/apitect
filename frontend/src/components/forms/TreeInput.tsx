import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { all, cond, F, ifElse, not, path, pipe, propEq, propOr, T as RT } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import {
  createContext,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'
import { Overlay } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSet } from 'react-use'
import { Actions } from 'react-use/lib/useSet'
import { useFocusOutside } from '~hooks/useFocusOutside'
import { useUndefinedEffect } from '~hooks/useUndefinedEffect'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Fn, Maybe, UseState } from '~shared/types/generic'

import {
  NodeNode,
  NodeSelector,
  NodeTree,
  OverlayStub,
  Selected,
  StyledTreeInput
} from '../../css/TreeInput.css'
import { LocaleKey } from '../../type-patches/locales'
import { codeIn, keyIn } from '../../utils/eventUtils'
import { stopPropagation } from '../../utils/events'
import { offset, sameWidth } from '../../utils/sameWidthMod'
import { uninitialized } from '../../utils/uninitialized'
import { DeleteIcon } from '../generic/DeleteIcon'
import { Scale, Tuple } from '../generic/Tuple'
import { ErrorInfo } from './ErrorInfo'

type WithId = { id: string }

type TreeSelectConfig<T extends WithId> = {
  name: string
  nodeRender: (node: T) => ReactNode
  selectionFilter?: (node: TreeNode<T>) => boolean
}

type OwnProps<T extends WithId> = {
  tree: TreeNode<T>
  label: LocaleKey
  containerClasses?: string
} & TreeSelectConfig<T>

type TreeInputContextType = TreeSelectConfig<any> & {
  setSelected: Dispatch<SetStateAction<any>>
  focusedNodeState: UseState<Maybe<TreeNode<any>>>
  openStateActions: Actions<TreeNode<any>>
  close: Fn
}
const TreeInputContext = createContext<TreeInputContextType>(uninitialized())

export const TreeInput = <T extends WithId>({
  tree,
  label,
  name,
  containerClasses,
  selectionFilter = RT,
  nodeRender,
  ...props
}: OwnProps<T>) => {
  const {
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<Maybe<T>>(
    () => tree.first(propEq('id', getValues(name)))?.value
  )

  useUndefinedEffect(() => setValue(name, undefined), selected)

  const focusedNodeState = useState<Maybe<TreeNode<T>>>()
  const [, openStateActions] = useSet<TreeNode<T>>(new Set([tree]))

  const parent = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const close = pipe(stopPropagation, () => {
    const el = target.current
    el?.focus()
    setShow(false)
  })

  const keyMap = cond([
    [codeIn('Enter', 'Space'), pipe(stopPropagation, F, setShow)],
    [codeIn('Escape'), close]
  ])

  useFocusOutside(parent, () => setShow(false))

  return (
    <StyledTreeInput
      ref={parent}
      onKeyDown={keyMap}
      className={clsx('form-floating', containerClasses)}
      {...props}
    >
      <Selected
        ref={target}
        className={clsx('form-select', { 'is-invalid': path(name.split('.'), errors) })}
        tabIndex={0}
        onClick={() => setShow(not)}
      >
        {selected && nodeRender(selected)}
      </Selected>
      <DeleteIcon
        onClick={() => {
          setSelected(undefined)
          setValue(name, undefined)
          setShow(false)
        }}
      />
      <Overlay
        target={target}
        container={container}
        popperConfig={{ modifiers: [offset, sameWidth] }}
        show={show}
        placement="bottom-start"
      >
        <NodeSelector hidden={!show}>
          {/* todo
          <div className="mx-2">
            <FormControl
              className="w-100 m-auto mt-2"
              size="sm"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          */}
          <TreeInputContext.Provider
            value={{
              close,
              openStateActions,
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
      <OverlayStub ref={container} />
    </StyledTreeInput>
  )
}

type TreeNodeProps<T> = {
  node: TreeNode<T>
}

TreeInput.Node = <T extends WithId>({ node }: TreeNodeProps<T>) => {
  const { name, close, nodeRender, setSelected, focusedNodeState, openStateActions } =
    useContext(TreeInputContext)
  const { setValue } = useFormContext()
  const { add, remove, has: isOpen } = openStateActions
  const [focusedNode, setFocusedNode] = focusedNodeState
  const hasChildren = isNotNilOrEmpty(node.children)

  const activate = (ev: MouseEvent) => {
    setValue(name, node.value.id)
    setSelected(node.value)
    close(ev)
  }

  const isVisible = (n: TreeNode<T>) => all(isOpen, n.$pathToRoot())

  const focus = (method: 'next' | 'prev') =>
    pipe(stopPropagation, () => {
      const id = focusedNode?.[method]?.(true, isVisible)?.value.id
      document.getElementById(`${name}-${id}`)?.focus()
    })

  const keyMap = cond([
    [codeIn('ArrowDown'), focus('next')],
    [codeIn('ArrowUp'), focus('prev')],
    [codeIn('ArrowLeft'), pipe(stopPropagation, () => remove(node))],
    [codeIn('ArrowRight'), pipe(stopPropagation, () => add(node))],
    [keyIn('Enter'), pipe(stopPropagation, activate)],
    [codeIn('Space'), pipe(stopPropagation, activate)]
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
          <div
            className="icn"
            onClick={pipe(stopPropagation, () => ifElse(isOpen, remove, add)(node))}
          >
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
