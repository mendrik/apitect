import { IconCircleCheck, IconCirclePlus, TablerIcon as IconProp } from '@tabler/icons'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { pipe } from 'ramda'
import React, { FC, forwardRef, HTMLAttributes, KeyboardEvent, useRef } from 'react'
import styled from 'styled-components'

import { horizontalGrowth } from '../../animations/horizontalGrowth'
import { ReactComponent as Loader } from '../../assets/inlineLoader.svg'
import { useKeyTriggers } from '../../hooks/useKeyTriggers'
import { useView } from '../../hooks/useView'
import { Icon, OwnProps as IconProps } from './Icon'
import { Scale, Tuple } from './Tuple'

type OwnProps = {
  icon: IconProp
  createTask: (item: string) => Promise<void>
} & HTMLAttributes<HTMLDivElement>

const EmptyEdit = styled.input`
  width: 100%;
  margin: 0;
  border: 1px dotted #ddd;
  background-color: white;
  border-radius: 2px;
  font-size: 1rem;
  padding-left: 5px;
  color: #0c88c4;
  &:focus,
  &:active {
    border: 1px solid #0c88c4;
    outline: none;
    box-shadow: 0 2px 3px rgba(120, 120, 120, 0.2) inset;
  }
`

enum View {
  Initial,
  Edit,
  Confirming
}

const RefIcon = forwardRef<HTMLButtonElement, IconProps>((props, ref) => (
  <Icon {...props} forwardRef={ref} />
))

const NewItem: FC<OwnProps> = ({ createTask, className, icon, ...props }) => {
  const { initialView, editView, confirmingView, view } = useView(View)
  const iconRef = useRef<HTMLButtonElement>(null)
  const focusIcon = () => iconRef.current?.focus()

  const ref = useKeyTriggers({
    onConfirm: async (ev: KeyboardEvent<HTMLInputElement>) => {
      confirmingView()
      await createTask(ev.currentTarget.value).then(initialView).then(focusIcon)
    },
    onCancel: pipe(initialView, focusIcon)
  })

  return (
    <div className={clsx('', className)} {...props}>
      <Tuple first={Scale.CONTENT}>
        {view === View.Initial && (
          <RefIcon icon={IconCirclePlus} onClick={editView} ref={iconRef} />
        )}
        {view === View.Edit && <Icon icon={IconCircleCheck} onClick={initialView} />}
        {view === View.Confirming && (
          <div className="icon-xs d-flex align-items-center" style={{ padding: 3 }}>
            <Loader style={{ width: 18, height: 18 }} />
          </div>
        )}
        <div className="input-spacer w-100">
          <AnimatePresence>
            {view !== View.Initial && (
              <motion.div
                {...horizontalGrowth}
                style={{ width: 0, padding: 2 }}
                className="overflow-hidden"
              >
                <EmptyEdit className="w-100" autoFocus ref={ref} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tuple>
    </div>
  )
}

export { NewItem }
