import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text } from 'utils/theme'
import IconClose from 'assets/icons/icon-close2.svg'
import IconAbout from 'assets/icons/icon-info2.svg'
import IconBack from 'assets/icons/icon-back2.svg'
import { TouchableOpacity } from 'react-native'
import { ModalHandleIndicator } from './ModalHandleIndicator'

type SwipeableModalHeaderProps = {
  closeAction: 'close' | 'back'
  closeModal: F0
  title?: string
  aboutAction?: F0
  subtitle?: string
  aboutIcon?: boolean
  hasIndicator?: boolean
}

const BACK_SIZE = 18
const CLOSE_SIZE = 14
const ABOUT_SIZE = 24
const HIT_SLOP = { top: 20, bottom: 20, left: 20, right: 20 }

export const SwipeableModalHeader = (props: SwipeableModalHeaderProps) => {
  const styles = useStyles()
  const navigation = useNavigation()

  const handleGoBack = () => {
    if (props.closeAction === 'back') {
      navigation.goBack()
      navigation.dispatch(DrawerActions.openDrawer())
    }
    if (props.closeAction === 'close') {
      props.closeModal()
    }
  }

  const closeButton = () => {
    if (props.closeAction === 'close')
      return <IconClose height={CLOSE_SIZE} width={CLOSE_SIZE} color={styles.close.color} />
    if (props.closeAction === 'back')
      return <IconBack height={BACK_SIZE} width={BACK_SIZE} color={styles.close.color} />
  }

  const aboutIcon = () => {
    if (props.aboutIcon)
      return (
        <TouchableOpacity onPress={props.aboutAction} hitSlop={HIT_SLOP}>
          <Box marginTop="-xs">
            <IconAbout height={ABOUT_SIZE} width={ABOUT_SIZE} color={styles.about.color} />
          </Box>
        </TouchableOpacity>
      )
    return <Box paddingRight="l" />
  }

  return (
    <Box padding="m" paddingTop="none">
      {props.hasIndicator && <ModalHandleIndicator />}
      <Box justifyContent="space-between" flexDirection="row" marginVertical="xsplus">
        <TouchableOpacity onPress={handleGoBack} hitSlop={HIT_SLOP}>
          {closeButton()}
        </TouchableOpacity>
        {aboutIcon()}
      </Box>
      {props.title && (
        <Box>
          <Text variant="displayBoldSM" color="black" marginTop="xxm">
            {props.title}
          </Text>
        </Box>
      )}
      {props.subtitle && (
        <Box>
          <Text variant="textSM" textAlign="center" color="blackBrighter" marginTop="xs">
            {props.subtitle}
          </Text>
        </Box>
      )}
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  close: {
    color: theme.colors.black,
  },
  about: {
    color: theme.colors.grey,
  },
}))
