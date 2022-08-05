import React, { createContext, ReactNode, useContext, useState } from 'react'

type ContextValue = {
  isModalVisible: boolean
  showModal: (content: ReactNode) => void
  hideModal: F0
  modalContent: ReactNode
}
type ContextProviderProps = {
  children: ReactNode
}

const initialValues = {
  isModalVisible: false,
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
}

export const ModalContext = createContext<ContextValue>(initialValues)
export const useModalContext = () => useContext(ModalContext)

export const ModalProvider = ({ children }: ContextProviderProps) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null)

  const showModal = (content: ReactNode) => {
    setModalContent(content)
  }
  const hideModal = () => {
    setModalContent(null)
  }

  return (
    <ModalContext.Provider
      value={{ isModalVisible: !!modalContent, showModal, hideModal, modalContent }}>
      {modalContent}
      {children}
    </ModalContext.Provider>
  )
}
