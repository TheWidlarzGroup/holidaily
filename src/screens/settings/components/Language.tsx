import { Loader } from 'components/Loader'
import { LoadingModal } from 'components/LoadingModal'
import { RadioInput } from 'components/RadioInput'
import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Box, mkUseStyles, Text } from 'utils/theme'
import ArrowUp from 'assets/icons/arrowUp.svg'
import ArrowDown from 'assets/icons/arrowDown.svg'

type LanguageProps = {
  setLoadingTrue: F0
  setLoadingFalse: F0
}

export const Language = ({ setLoadingFalse, setLoadingTrue }: LanguageProps) => {
  const [opened, { toggle: changeOpened }] = useBooleanState(false)
  const [selectedLng, setSelectedLng] = useState<'en' | 'pl'>('pl')

  const styles = useStyles()

  const { i18n, t } = useTranslation('settings')

  const changeLanguage = (lng: 'pl' | 'en') => {
    if (lng == selectedLng) return
    setLoadingTrue()
    setSelectedLng(lng)
  }

  useEffect(() => {
    i18n.changeLanguage(selectedLng).then(setLoadingFalse)
  }, [selectedLng])

  const heightProgress = useDerivedValue(
    () => (opened ? withTiming(70, { duration: 200 }) : withTiming(0, { duration: 200 })),
    [opened]
  )

  const animatedOptions = useAnimatedStyle(() => ({
    height: heightProgress.value,
    opacity: heightProgress.value / 70,
  }))

  const animatedArrow = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${(heightProgress.value / 70) * 180}deg`,
      },
    ],
  }))

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Text variant="body1Bold" textAlign="left">
          {t('language')}
        </Text>
        <TouchableOpacity
          onPress={changeOpened}
          hitSlop={{ top: 20, bottom: 20, left: 300, right: 20 }}>
          <Animated.View style={animatedArrow}>
            <ArrowDown />
          </Animated.View>
        </TouchableOpacity>
      </Box>
      <Animated.View style={[styles.options, animatedOptions]}>
        <TouchableOpacity style={styles.lng} onPress={() => changeLanguage('en')}>
          <Text variant="body1" marginVertical="s" textAlign="left">
            {t('english')}
          </Text>
          <RadioInput checked={selectedLng == 'en'} onPress={() => {}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lng} onPress={() => changeLanguage('pl')}>
          <Text variant="body1" textAlign="left">
            {t('polish')}
          </Text>
          <RadioInput checked={selectedLng == 'pl'} onPress={() => {}} />
        </TouchableOpacity>
      </Animated.View>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabledText,
    borderRadius: theme.borderRadii.lplus,
    padding: theme.spacing.ml,
    marginVertical: theme.spacing.s,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 3,
  },
  lng: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  options: {
    overflow: 'hidden',
  },
}))
