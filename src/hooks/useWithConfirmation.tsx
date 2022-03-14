import React from 'react'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ConfirmationModalProps } from 'types/confirmationModalProps'

export const useWithConfirmation = ({
  onAccept,
  onDecline,
  ...p
}: Omit<ConfirmationModalProps, 'hideModal' | 'onDecline'> & { onDecline?: F0 }) => {
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
        {...p}
      />
    )
}
