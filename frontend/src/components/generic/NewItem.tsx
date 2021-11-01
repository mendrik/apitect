import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, HTMLAttributes } from 'react'
import { CheckCircle, Icon as IconProp, PlusCircle } from 'react-feather'
import styled from 'styled-components'

import { horizontalGrowth } from '../../animations/horizontalGrowth'
import { useViews } from '../../hooks/useViews'
import { Icon } from './Icon'
import { Scale, Tuple } from './Tuple'

type OwnProps = {
  icon: IconProp
} & HTMLAttributes<HTMLDivElement>

const EmptyEdit = styled.input`
  width: 100%;
  margin: 2px;
  border: 1px dotted #ddd;
  background-color: white;
  border-radius: 2px;
  font-size: 1rem;
  padding-left: 5px;
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

export const NewItem: FC<OwnProps> = ({ className, icon, ...props }) => {
  const { view, editView, initialView } = useViews(View.Initial, View)
  return (
    <div className={clsx('', className)} {...props}>
      <Tuple first={Scale.CONTENT} second={Scale.MAX}>
        {view === View.Initial ? (
          <Icon icon={PlusCircle} onClick={editView} />
        ) : (
          <Icon icon={CheckCircle} onClick={initialView} />
        )}
        <div className="input-spacer">
          <AnimatePresence exitBeforeEnter>
            {view === View.Edit && (
              <motion.div {...horizontalGrowth}>
                <EmptyEdit className="me-2" autoFocus />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tuple>
    </div>
  )
}
