import React, { ReactNode, createContext, useContext, useState } from 'react'

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)

  const showModal = (content: ReactNode) => {
    setIsModalVisible(!isModalVisible)
    setModalContent(content)
  }
  const hideModal = () => {
    setIsModalVisible(!isModalVisible)
    setModalContent(null)
  }

  return (
    <ModalContext.Provider value={{ isModalVisible, showModal, hideModal, modalContent }}>
      {modalContent}
      {children}
    </ModalContext.Provider>
  )
}
