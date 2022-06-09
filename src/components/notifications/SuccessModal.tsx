import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import { Image } from 'react-native'

type ModalPropsType = {
  title: string
  onPressText?: string
  onPress?: F0
}

export const SuccessModal = ({ title, onPressText, onPress }: ModalPropsType) => {
  const styles = useStyles()

  return (
    <Box
      padding="m"
      backgroundColor="successToastBg"
      minHeight={64}
      alignItems="center"
      borderWidth={1}
      borderColor="approvedGreen"
      borderRadius="l1min"
      flexDirection="row">
      <Image source={require('assets/icons/success-icon.png')} style={styles.image} />
      <Text marginLeft="xm" variant="textSM">
        {title}
      </Text>
      {onPress && onPressText && (
        <BaseOpacity
          onPress={onPress}
          paddingVertical="xm"
          paddingRight="xxm"
          style={{ marginLeft: 'auto' }}>
          <Text variant="buttonSM" color="darkGreen">
            {onPressText}
          </Text>
        </BaseOpacity>
      )}
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  image: {
    width: 20,
    height: 20,
  },
}))
