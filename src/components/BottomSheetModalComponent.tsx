import React, { ReactNode, useCallback, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Box } from 'utils/theme'

type Props = {
  children: ReactNode
  modalRef: React.RefObject<BottomSheetModalMethods>
  index?: number
}

export const BottomSheetModalComponent = (props: Props & BottomSheetModalProps) => {
  const snapPoints = useMemo(() => props.snapPoints, [props.snapPoints])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    []
  )
  return (
    <BottomSheetModal
      enableContentPanningGesture
      ref={props.modalRef}
      index={props.index}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      stackBehavior={'push'}
      detached={props.detached}
      bottomInset={props.bottomInset}
      handleComponent={null}>
      <Box flex={1}>{props.children}</Box>
    </BottomSheetModal>
  )
}
