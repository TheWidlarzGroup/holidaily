import { RadioInput } from 'components/RadioInput'
import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { Box, mkUseStyles, Text } from 'utils/theme'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { Alert } from 'components/Alert'
import CheckCircle from 'assets/icons/checkCircle.svg'
import { SupportedLanguageKeys, locales } from 'utils/locale'

type LanguageProps = {
  setLoadingTrue: F0
  setLoadingFalse: F0
}

export const Language = ({ setLoadingFalse, setLoadingTrue }: LanguageProps) => {
  const { i18n, t } = useTranslation('settings')

  const [opened, { toggle: changeOpened }] = useBooleanState(false)
  const [changeAlertVisible, { setTrue: showChangeAlert, setFalse: hideChangeAlert }] =
    useBooleanState(false)
  const [selectedLng, setSelectedLng] = useState(i18n.language as SupportedLanguageKeys)

  const styles = useStyles()

  const changeLanguage = (lng: SupportedLanguageKeys) => {
    if (lng === selectedLng) return
    hideChangeAlert()
    setLoadingTrue()
    setSelectedLng(lng)
  }

  useEffect(() => {
    if (selectedLng === i18n.language) return
    i18n.changeLanguage(selectedLng).then(() => {
      setLoadingFalse()
      showChangeAlert()
    })
  }, [selectedLng, i18n, setLoadingFalse, showChangeAlert])

  useEffect(() => {
    if (changeAlertVisible === false) return
    const timeout = setTimeout(hideChangeAlert, 4000)

    return () => clearTimeout(timeout)
  }, [hideChangeAlert, changeAlertVisible])

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
    <>
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
          {Object.keys(locales).map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.lng}
              onPress={() => changeLanguage(language as SupportedLanguageKeys)}>
              <Text variant="body1" marginVertical="s" textAlign="left">
                {t(language)}
              </Text>
              <RadioInput checked={selectedLng === language} onPress={() => {}} />
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Box>
      <Alert show={changeAlertVisible} onPress={hideChangeAlert}>
        <CheckCircle style={styles.icon} />
        <Text variant="regular15">
          <Text variant="bold15">{t('language')} </Text>
          {t('changed')}
        </Text>
      </Alert>
    </>
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
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: theme.spacing.m,
  },
}))
