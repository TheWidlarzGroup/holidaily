import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import IconBack from 'assets/icons/icon-back-white.svg'
import { UserProfileNavigationProps } from 'navigation/types'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { useTranslation } from 'react-i18next'
import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'
import { CheckMark } from './Checkmark'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

export const BubbleContainer = ({
  route: { params: p },
}: UserProfileNavigationProps<'ColorPicker'>) => {
  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const { width } = useDimensions()
  const { goBack } = useNavigation()
  const [dropColor, setDropColor] = useState(theme.colors.disabledText)
  const { animatedDrop, bubbles, animateCheckmark, dropArea, animateDropArea } = useBubbles()

  useEffect(() => {
    if (dropColor !== theme.colors.disabledText) p.onChange(dropColor)
  }, [dropColor, p, theme.colors.disabledText])

  return (
    <View style={styles.mainContainer}>
      {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
      <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.2}>
        <IconBack />
      </TouchableOpacity>
      <Box marginTop="xxxl" alignItems="center">
        <Text variant="buttonText1" marginHorizontal="xxl" color="alwaysWhite">
          {t('colorPicker')}
        </Text>
      </Box>
      <Animated.View
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            left: width / 2 - 500,
            zIndex: dropColor === theme.colors.disabledText ? 0 : 3,
          },
        ]}
      />
      {bubbles.map((bubble) => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={C.BUBBLE_SIZE}
            setDropColor={setDropColor}
            dropArea={dropArea.value}
            animateDropArea={animateDropArea}
          />
        </Box>
      ))}
    </View>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 65,
    zIndex: theme.zIndices['2'],
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexWrap: 'wrap',
  },
  dropArea: {
    position: 'absolute',
    width: 1000,
    borderRadius: 500,
    shadowColor: shadow.md.shadowColor,
    shadowRadius: shadow.md.shadowRadius,
    shadowOpacity: shadow.md.shadowOpacity,
    shadowOffset: shadow.md.shadowOffset,
  },
  scaleCheckmark: {
    transform: [{ scale: 2 }],
  },
}))
