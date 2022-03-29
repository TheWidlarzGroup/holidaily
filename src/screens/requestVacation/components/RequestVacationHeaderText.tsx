import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Box, Text } from 'utils/theme'
import BackArrowIcon from 'assets/icons/backArrow.svg'
import { useTranslation } from 'react-i18next'

type HeaderProps = { step: number; setStep: F1<number> }

export const HeaderRequestVacation = ({ step, setStep }: HeaderProps) => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('requestVacation')

  const onStepBack = () => {
    if (step > 0) setStep(step - 1)
    else goBack()
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="l"
      paddingVertical="m"
      paddingTop={'isSent' in p ? 'm' : 0}>
      <Box alignItems="center" justifyContent="center" flexDirection="row">
        <Pressable onPress={onStepBack}>
          <BackArrowIcon width={30} height={20} />
        </Pressable>
      </Box>
      <Box flex={1} marginRight="l">
        <Text variant="modalHeader" textAlign="center">
          {t('title')}
        </Text>
      </Box>
    </Box>
  )
}
