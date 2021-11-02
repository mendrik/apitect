import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { pipe } from 'ramda'
import React, { FC, forwardRef, HTMLAttributes, useRef } from 'react'
import { CheckCircle, Icon as IconProp, PlusCircle } from 'react-feather'
import styled from 'styled-components'

import { horizontalGrowth } from '../../animations/horizontalGrowth'
import { useKeyTriggers } from '../../hooks/useKeyTriggers'
import { useView } from '../../hooks/useView'
import { Icon, OwnProps as IconProps } from './Icon'
import { Scale, Tuple } from './Tuple'

type OwnProps = {
  icon: IconProp
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
  Edit
}

const RefIcon = forwardRef<HTMLButtonElement, IconProps>((props, ref) => (
  <Icon {...props} forwardRef={ref} />
))

const NewItem: FC<OwnProps> = ({ className, icon, ...props }) => {
  const { initialView, editView, view } = useView(View)
  const iconRef = useRef<HTMLButtonElement>(null)
  const focusIcon = () => iconRef.current?.focus()

  const ref = useKeyTriggers({
    onConfirm: pipe(initialView),
    onCancel: pipe(initialView, focusIcon)
  })

  return (
    <div className={clsx('', className)} {...props}>
      <Tuple first={Scale.CONTENT}>
        {view === View.Initial && <RefIcon icon={PlusCircle} onClick={editView} ref={iconRef} />}
        {view === View.Edit && <Icon icon={CheckCircle} onClick={initialView} />}
        <div className="input-spacer w-100">
          <AnimatePresence>
            {view === View.Edit && (
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
