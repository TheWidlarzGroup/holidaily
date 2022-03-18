import React, { FC } from 'react'
import { ModalProps } from 'react-native-modal'

import { Text, mkUseStyles } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { calculatePTO, getFormattedPeriod } from 'utils/dates'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

type SelectPeriodModalProps = Pick<ModalProps, 'isVisible'> & {
  onSubmit: F0
  periodStart: string
  periodEnd: string
}

export const SelectPeriodModal: FC<SelectPeriodModalProps> = ({
  isVisible,
  onSubmit,
  periodEnd,
  periodStart,
}) => {
  const styles = useStyles()

  const { t } = useTranslation('requestVacation')

  const progress = useDerivedValue(() => (isVisible ? 1 : 0), [isVisible])

  const animatedModalStyles = useAnimatedStyle(() => {
    const v = progress.value
    const h = 100
    return {
      transform: [{ translateY: withTiming((1 - v) * h, { duration: 100 }) }],
      opacity: withTiming(v, { duration: 100 }),
    }
  }, [])

  if (!isVisible) return null

  return (
    <Animated.View style={[styles.modal, animatedModalStyles]}>
      <Text variant="boldBlackCenter18">
        {getFormattedPeriod(new Date(periodStart), new Date(periodEnd))}
      </Text>
      <Text variant="body1" marginTop="xs" marginBottom="l">
        {t('pickedPTO', { days: String(calculatePTO(periodStart, periodEnd)) })}
      </Text>
      <CustomButton label={t('select')} variant="primary" onPress={onSubmit} />
    </Animated.View>
  )
}

const useStyles = mkUseStyles((theme) => ({
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xl,
  },
}))
