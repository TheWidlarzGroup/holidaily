import React, { ReactNode, useContext, useState } from 'react'

type DefaultValue = undefined
type ContextValue = {
  modal: boolean
  handleModal: (content?: ReactNode) => void
  modalContent: ReactNode
}
type ContextProviderProps = {
  children: ReactNode
}

export const ModalContext = React.createContext<DefaultValue | ContextValue>(undefined)
export const useModalContext = () => useContext(ModalContext)

export const ModalProvider = ({ children }: ContextProviderProps) => {
  const [modal, setModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)

  const handleModal = (content?: ReactNode) => {
    setModal(!modal)
    if (content) setModalContent(content)
    if (!content) setModalContent(null)
  }

  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      {modalContent}
      {children}
    </ModalContext.Provider>
  )
}
