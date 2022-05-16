import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import IconBack from 'assets/icons/icon-back2.svg'
import Info from 'assets/icons/icon-info.svg'
import { UserProfileNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { windowWidth } from 'utils/deviceSizes'
import { useBooleanState } from 'hooks/useBooleanState'
import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'
import { CheckMark } from './Checkmark'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

export const BubbleContainer = ({
  route: { params: p },
}: UserProfileNavigationProps<'ColorPicker'>) => {
  const styles = useStyles()
  const theme = useTheme()
  const [dropColor, setDropColor] = useState(theme.colors.colorPickerDropArea)
  const { animatedDrop, bubbles, animateCheckmark, dropArea, animateDropArea } = useBubbles()

  useEffect(() => {
    if (dropColor !== theme.colors.colorPickerDropArea) p.onChange(dropColor)
  }, [dropColor, p, theme.colors.colorPickerDropArea])

  return (
    <View style={styles.mainContainer}>
      {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
      <BubbleContainerButtons />
      <BubbleContainerHeader />
      <DropArea
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            zIndex: dropColor === theme.colors.colorPickerDropArea ? 0 : 3,
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

const BubbleContainerButtons = () => {
  const styles = useStyles()
  const theme = useTheme()
  const { goBack } = useNavigation()
  const [isInfoVisible, { setTrue: showInfo, setFalse: hideInfo }] = useBooleanState(false)
  return (
    <>
      <Box position="absolute" height={200} width="100%">
        <Box flexDirection="row">
          <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.2}>
            <IconBack color={theme.colors.alwaysWhite} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showInfo} style={styles.info} activeOpacity={0.2}>
            <Info color={theme.colors.alwaysWhite} />
          </TouchableOpacity>
        </Box>
        {isInfoVisible && <Box flex={1} marginHorizontal="m" marginTop="s" bg="alwaysWhite"></Box>}
      </Box>
    </>
  )
}

const BubbleContainerHeader = () => {
  const { t } = useTranslation('userProfile')
  return (
    <Box marginTop="xxxl" alignItems="center" style={{ width: '100%' }}>
      <Text variant="displayBoldSM" marginTop="l" marginBottom="m" color="alwaysWhite">
        {t('colorPicker')}
      </Text>
      <Text variant="textSM" color="alwaysWhite">
        {t('colorPickerSubtitle')}
      </Text>
    </Box>
  )
}

const DropArea = Animated.createAnimatedComponent(Box)

const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    padding: theme.spacing.m,
    top: 44,
    left: 3,
    zIndex: theme.zIndices['2'],
  },
  info: {
    padding: theme.spacing.m,
    top: 30,
    marginLeft: 'auto',
    zIndex: theme.zIndices['2'],
  },
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.colorPickerBackdrop,
    flexWrap: 'wrap',
  },
  dropArea: {
    position: 'absolute',
    width: windowWidth * 1.2,
    left: -windowWidth * 0.1,
    aspectRatio: 1,
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
