import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text } from 'utils/theme'
import CrossIcon from 'assets/icons/icon-close.svg'
import { useTranslation } from 'react-i18next'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import ArrowLeft from 'assets/icons/arrow-left.svg'

type HeaderProps = { step: number; setStep: F1<number>; stepBackNeedsConfirm?: boolean }

export const RequestVacationHeaderText = (p: HeaderProps) => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('requestVacation')
  const styles = useStyles()
  const stepBack = () => {
    if (p.step > 0) p.setStep(p.step - 1)
    else goBack()
  }
  const goBackWithConfirm = useWithConfirmation({
    onAccept: goBack,
  })
  const onCloseModal = p.stepBackNeedsConfirm ? goBackWithConfirm : goBack

  return (
    <Box alignItems="center" marginHorizontal="m" marginBottom="s">
      <Box flexDirection="row-reverse" justifyContent="space-between" width="100%">
        <Pressable style={styles.stepBackBtn} onPress={onCloseModal}>
          <CrossIcon style={styles.crossIcon} />
        </Pressable>
        {p.step > 0 && (
          <Pressable style={styles.stepBackBtn} onPress={stepBack}>
            <ArrowLeft style={styles.crossIcon} />
          </Pressable>
        )}
      </Box>
      <Text variant="modalHeader" textAlign="center">
        {t('title')}
      </Text>
    </Box>
  )
}
const useStyles = mkUseStyles((theme) => ({
  stepBackBtn: {
    paddingHorizontal: theme.spacing.s,
    alignSelf: 'flex-end',
    meginBottom: theme.spacing.m,
  },
  crossIcon: {
    color: theme.colors.black,
    width: 15,
    height: 15,
  },
}))
