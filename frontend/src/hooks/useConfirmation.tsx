import { cond, propEq } from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { QuestionView } from '../components/QuestionView'
import { ButtonRow } from '../components/forms/ButtonRow'
import { Fn } from '../shared/types/generic'
import { focus } from '../utils/focus'
import { stopPropagation as sp } from '../utils/stopPropagation'
import { useOnActivate } from './useOnActivate'

export const useConfirmation = (
  question: TFuncKey,
  onConfirm: Fn,
  confirmButton: TFuncKey = 'common.confirm',
  cancelButton: TFuncKey = 'common.cancel'
): [Fn<JSX.Element>, Fn] => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useOnActivate<HTMLButtonElement>(() => {
    setOpen(false)
    onConfirm()
  })
  const close = () => setOpen(false)

  useEffect(() => {
    if (ref.current) {
      focus(ref.current)
    }
  }, [open])

  const keyMap = cond([
    [propEq('code', 'Escape'), sp(() => setOpen(false))],
    [propEq('key', 'Enter'), sp],
    [propEq('code', 'Space'), sp]
  ])

  const Confirm = useCallback(() => {
    return (
      <Modal show={open} onHide={close} centered enforceFocus onKeyDown={keyMap}>
        <Modal.Header closeButton>
          <Modal.Title>{t('common.confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionView body={question}>
            <ButtonRow>
              <Button onClick={close} variant="outline-primary" type="button">
                {t(cancelButton)}
              </Button>
              <Button ref={ref} type="button" variant="primary">
                {t(confirmButton)}
              </Button>
            </ButtonRow>
          </QuestionView>
        </Modal.Body>
      </Modal>
    )
  }, [open])

  return [
    Confirm,
    () => {
      setOpen(true)
    }
  ]
}
