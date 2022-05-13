import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Box } from 'utils/theme'
import { BackHandler } from 'react-native'

type Props = {
  children: ReactNode
  modalRef: React.RefObject<BottomSheetModalMethods>
  isOpen?: boolean
  closeModal?: F0
  index?: number
}

export const BottomSheetModalComponent = (props: Props & BottomSheetModalProps) => {
  const snapPoints = useMemo(() => props.snapPoints, [props.snapPoints])

  useEffect(() => {
    const backAction = () => {
      if (props.isOpen) {
        props.modalRef.current?.dismiss()
        return true
      }
    }

    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [props.isOpen, props.modalRef])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    []
  )
  return (
    <BottomSheetModal
      onDismiss={() => props?.closeModal && props?.closeModal()}
      enableContentPanningGesture
      ref={props.modalRef}
      index={props.index}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      stackBehavior="push"
      detached={props.detached}
      bottomInset={props.bottomInset}
      handleComponent={null}>
      <Box flex={1} backgroundColor="white">
        {props.children}
      </Box>
    </BottomSheetModal>
  )
}
