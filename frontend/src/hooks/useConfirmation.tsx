import { cond, propEq } from 'ramda'
import { propNotEq } from 'ramda-adjunct'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { ButtonRow } from '~forms/ButtonRow'
import { Fn } from '~shared/types/generic'

import { QuestionView } from '../components/QuestionView'
import { focus } from '../utils/focus'
import { stopPropagation as sp } from '../utils/stopPropagation'
import { useOnActivate } from './useOnActivate'

export const useConfirmation = (
  question: TFuncKey,
  onConfirm: Fn,
  confirmButton: TFuncKey = 'common.confirm',
  cancelButton: TFuncKey = 'common.cancel'
): [Fn<JSX.Element | null>, Fn] => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const refOk = useOnActivate<HTMLButtonElement>(() => {
    close()
    onConfirm()
  })
  const refCancel = useOnActivate<HTMLButtonElement>(() => {
    close()
  })

  useEffect(() => {
    if (refOk.current) {
      focus(refOk.current)
    }
  }, [open])

  const keyMap = cond([
    [propEq('code', 'Escape'), sp(close)],
    [propNotEq('code', 'Tab'), sp]
  ])

  const Confirm = useCallback(() => {
    return open ? (
      <Modal show={open} onHide={close} centered enforceFocus onKeyDown={keyMap}>
        <Modal.Header closeButton>
          <Modal.Title>{t('common.confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionView body={question}>
            <ButtonRow>
              <Button ref={refCancel} variant="outline-primary" type="button">
                {t(cancelButton)}
              </Button>
              <Button ref={refOk} type="button" variant="primary">
                {t(confirmButton)}
              </Button>
            </ButtonRow>
          </QuestionView>
        </Modal.Body>
      </Modal>
    ) : null
  }, [open])

  return [Confirm, () => setOpen(true)]
}
