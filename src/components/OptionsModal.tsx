import React, { PropsWithChildren } from 'react'
import { Pressable, TouchableHighlight } from 'react-native'
import Svg from 'react-native-svg'
import { isIos } from 'utils/layout'
import { Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { ModalHandleIndicator } from './ModalHandleIndicator'
import { SwipeableModal } from './SwipeableModal'

type Option = {
  Icon?: Svg
  key?: string
  text: string
  onPress: F0
}

type OptionsModalProps = {
  options: Option[]
  isOpen: boolean
  onHide: F0
}

export const OptionsModal = (p: OptionsModalProps) => {
  const styles = useStyles()
  return (
    <SwipeableModal isOpen={p.isOpen} onHide={p.onHide}>
      <Box
        bg="white"
        position="absolute"
        bottom={0}
        minHeight={160}
        style={{ width: '100%' }}
        borderTopLeftRadius="l2min"
        borderTopRightRadius="l2min">
        <ModalHandleIndicator style={styles.modalHandleBar} />
        {p.options.map((op) => {
          const { Icon, onPress, text, key } = op
          return (
            <OptionButton key={key ?? text} onPress={onPress}>
              <Box style={styles.optionWrapper}>
                {Icon && <Icon style={styles.optionIcon} />}
                <Text variant="buttonMD">{text}</Text>
              </Box>
            </OptionButton>
          )
        })}
      </Box>
    </SwipeableModal>
  )
}

const OptionButton = ({ children, onPress }: PropsWithChildren<{ onPress: F0 }>) => {
  const styles = useStyles()
  const theme = useTheme()
  const buttonProps = { onPress, style: styles.option }
  return isIos ? (
    <TouchableHighlight activeOpacity={0.8} {...buttonProps} underlayColor={theme.colors.special}>
      {children}
    </TouchableHighlight>
  ) : (
    <Pressable
      {...buttonProps}
      android_ripple={{
        color: theme.colors.special,
      }}>
      {children}
    </Pressable>
  )
}

const useStyles = mkUseStyles((theme) => ({
  modalHandleBar: {
    top: 0,
    marginTop: theme.spacing.xm,
    marginBottom: theme.spacing.l,
    position: 'relative',
  },
  optionIcon: {
    marginRight: theme.spacing.xm,
    color: theme.colors.titleActive,
  },
  option: {
    width: '100%',
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
  },
  optionWrapper: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
}))
