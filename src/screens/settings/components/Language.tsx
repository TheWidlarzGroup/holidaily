import { RadioInput } from 'components/RadioInput'
import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { BaseOpacity, Box, Text } from 'utils/theme'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { locales } from 'utils/locale'
import { setItemAsync } from 'expo-secure-store'
import { keys } from 'utils/manipulation'
import { Languages } from '../../../../i18n'
import { useLangAnimations } from './useLangAnimation'
import { LangChangeAlert } from './LangChangeAlert'

type LanguageProps = {
  setLoadingTrue: F0
  setLoadingFalse: F0
}

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const Language = ({ setLoadingFalse, setLoadingTrue }: LanguageProps) => {
  const { i18n, t } = useTranslation('settings')
  const { changeOpened, animatedArrow, animatedOptions } = useLangAnimations()
  const [isChangeAlertVisible, { setTrue: showChangeAlert, setFalse: hideChangeAlert }] =
    useBooleanState(false)
  const [selectedLng, selectLng] = useState(i18n.language as keyof Languages)
  const changeLanguage = (lng: keyof Languages) => {
    if (lng === selectedLng) return
    hideChangeAlert()
    setLoadingTrue()
    selectLng(lng)
    setItemAsync('language', lng)
  }

  useEffect(() => {
    if (selectedLng === i18n.language) return
    i18n.changeLanguage(selectedLng).then(() => {
      setLoadingFalse()
      showChangeAlert()
    })
  }, [selectedLng, i18n, setLoadingFalse, showChangeAlert])

  return (
    <>
      <Box backgroundColor="disabledText" borderRadius="lplus" padding="ml" marginVertical="s">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginRight="xs">
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
        <AnimatedBox overflow="hidden" style={animatedOptions}>
          {keys(locales).map((language) => (
            <BaseOpacity
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingVertical="s"
              key={language}
              onPress={() => {
                changeLanguage(language)
                changeOpened()
              }}>
              <Text variant="body1" textAlign="left">
                {t(language)}
              </Text>
              <RadioInput checked={selectedLng === language} onPress={() => {}} />
            </BaseOpacity>
          ))}
        </AnimatedBox>
      </Box>
      <LangChangeAlert isVisible={isChangeAlertVisible} dismiss={hideChangeAlert} />
    </>
  )
}
