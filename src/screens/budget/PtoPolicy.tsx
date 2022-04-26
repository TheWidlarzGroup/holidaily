import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { mkUseStyles, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { SwipeableModal, SwipeableModalRef } from 'components/SwipeableModal'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

const Background = require('assets/policy_modal_background.png')

export const PtoPolicy = () => {
  const { goBack } = useNavigation()
  const styles = useStyles()
  const modalRef = useRef<SwipeableModalRef>(null)
  return (
    <SwipeableModal onHide={goBack} ref={modalRef}>
      <PolicyHeader
        closeModal={() => {
          if (modalRef && modalRef.current) modalRef.current.hide()
        }}
      />
      <Policies />
      <FastImage style={[styles.background]} source={Background} />
    </SwipeableModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
