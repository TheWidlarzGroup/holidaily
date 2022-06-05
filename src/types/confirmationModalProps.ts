export type ConfirmationModalProps = {
  hideModal: F0
  onAccept: F0
  onDecline: F0
  onDismiss?: F0
  content?: string | null
  header?: string | null
  declineBtnText?: string
  acceptBtnText?: string
  statusIcon?: 'success' | 'error'
  hideRejectButton?: true
}
