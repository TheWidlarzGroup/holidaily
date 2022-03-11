import React from 'react'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'

type Props = {
  onAccept: F0
  onDecline?: F0
  content?: string | null
  header?: string | null
  acceptBtnText?: string
  declineBtnText?: string
}

export const useWithConfirmation = ({
  onAccept,
  onDecline,
  content,
  header,
  acceptBtnText,
  declineBtnText,
}: Props) => {
  const { hideModal, showModal } = useModalContext()

  return () =>
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {
          hideModal()
          onAccept()
        }}
        onDecline={() => {
          hideModal()
          onDecline?.()
        }}
        header={header}
        content={content}
        declineBtnText={declineBtnText}
        acceptBtnText={acceptBtnText}
      />
    )
}
