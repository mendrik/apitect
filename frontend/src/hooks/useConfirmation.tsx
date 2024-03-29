import { complement, cond, juxt, pipe } from 'ramda'
import { useCallback, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ButtonRow } from '~forms/ButtonRow'
import { useFocus } from '~hooks/useFocus'
import { Fn } from '~shared/types/generic'

import { QuestionView } from '../components/QuestionView'
import { LocaleKey } from '../type-patches/locales'
import { codeIn } from '../utils/eventUtils'
import { stopPropagation } from '../utils/events'

export const useConfirmation = (
  question: LocaleKey,
  onConfirm: Fn,
  confirmButton: LocaleKey = 'common.confirm',
  cancelButton: LocaleKey = 'common.cancel'
): [Fn<JSX.Element | null>, Fn] => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  const keyMap = cond([
    [codeIn('Escape'), pipe(stopPropagation, close)],
    [complement(codeIn('Tab')), stopPropagation]
  ])

  const Confirm = useCallback(() => {
    const { t } = useTranslation()
    const refOk = useRef<HTMLButtonElement>(null)
    const okClick = juxt([pipe(stopPropagation, close), onConfirm])

    useFocus(refOk)

    return open ? (
      <Modal
        show={open}
        onHide={close}
        centered
        enforceFocus
        onKeyDown={keyMap}
        restoreFocus
        key="confirm"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('common.confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionView body={question}>
            <ButtonRow>
              <Button onClick={close} variant="outline-primary" type="button">
                {t(cancelButton)}
              </Button>
              <Button onClick={okClick} ref={refOk} type="button" variant="primary">
                {t(confirmButton)}
              </Button>
            </ButtonRow>
          </QuestionView>
        </Modal.Body>
      </Modal>
    ) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onConfirm])

  const openFn = useCallback(() => {
    setOpen(true)
  }, [])
  return [Confirm, openFn]
}
