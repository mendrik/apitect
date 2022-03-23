import { complement, cond } from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { ButtonRow } from '~forms/ButtonRow'
import { Fn } from '~shared/types/generic'

import { QuestionView } from '../components/QuestionView'
import { codeIn } from '../utils/eventUtils'
import { focus } from '../utils/focus'
import { stopPropagation as sp } from '../utils/stopPropagation'
import { useOnActivate } from './useOnActivate'

export const useConfirmation = (
  question: TFuncKey,
  onConfirm: Fn,
  confirmButton: TFuncKey = 'common.confirm',
  cancelButton: TFuncKey = 'common.cancel'
): [Fn<JSX.Element | null>, Fn] => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const keyMap = cond([
    [codeIn('Escape'), sp(close)],
    [complement(codeIn('Tab')), sp]
  ])

  const Confirm = useCallback(() => {
    const { t } = useTranslation()
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
    }, [open, refOk])

    return open ? (
      <Modal show={open} onHide={close} centered enforceFocus onKeyDown={keyMap} key="">
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
  }, [open, close, question])

  return [Confirm, () => setOpen(true)]
}
