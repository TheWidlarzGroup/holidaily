import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text } from 'utils/theme'
import CrossIcon from 'assets/icons/icon-close.svg'
import { useTranslation } from 'react-i18next'
import { useWithConfirmation } from 'hooks/useWithConfirmation'

type HeaderProps = { step: number; setStep: F1<number>; stepBackNeedsConfirm?: boolean }

export const RequestVacationHeaderText = (p: HeaderProps) => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('requestVacation')
  const styles = useStyles()
  const stepBack = () => {
    if (p.step > 0) p.setStep(p.step - 1)
    else goBack()
  }
  const stepBackWithConfirm = useWithConfirmation({
    onAccept: stepBack,
  })
  const onStepBack = p.stepBackNeedsConfirm ? stepBackWithConfirm : stepBack

  return (
    <Box alignItems="center" marginHorizontal="m" marginBottom="s">
      <Pressable style={styles.stepBackBtn} onPress={onStepBack}>
        <CrossIcon style={styles.crossIcon} />
      </Pressable>
      <Text variant="modalHeader" textAlign="center">
        {t('title')}
      </Text>
    </Box>
  )
}
const useStyles = mkUseStyles((theme) => ({
  stepBackBtn: {
    padding: theme.spacing.s,
    alignSelf: 'flex-end',
    meginBottom: theme.spacing.m,
  },
  crossIcon: {
    color: theme.colors.black,
    width: 15,
    height: 15,
  },
}))
