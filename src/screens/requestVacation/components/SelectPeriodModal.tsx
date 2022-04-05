import React from 'react'
import { ModalProps } from 'react-native-modal'
import { Text, Box } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { getFormattedPeriod } from 'utils/dates'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

const AnimatedBox = Animated.createAnimatedComponent(Box)
type SelectPeriodModalProps = Pick<ModalProps, 'isVisible'> & {
  onSubmit: F0
  periodStart: string
  periodEnd: string
  ptoTaken: number
  availablePto: number
}

export const SelectPeriodModal = (p: SelectPeriodModalProps) => {
  const { t } = useTranslation('requestVacation')
  const progress = useDerivedValue(() => (p.isVisible ? 1 : 0), [p.isVisible])
  const animatedModalStyles = useAnimatedStyle(() => {
    const v = progress.value
    const h = 100
    return {
      transform: [{ translateY: withTiming((1 - v) * h, { duration: 100 }) }],
      opacity: withTiming(v, { duration: 100 }),
    }
  }, [])

  if (!p.isVisible) return null

  const isInvalid = p.availablePto < p.ptoTaken
  return (
    <AnimatedBox
      flex={1}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      paddingHorizontal="xxl"
      paddingVertical="xl"
      backgroundColor={isInvalid ? 'specialRed' : 'primary'}
      style={animatedModalStyles}>
      {isInvalid ? (
        <>
          <Text variant="boldBlackCenter18">Ooops!</Text>
          <Text variant="body1" marginTop="xs" marginBottom="l">
            {p.availablePto} days left
          </Text>
          <CustomButton label="Clear selection" variant="danger" onPress={p.onSubmit} />
        </>
      ) : (
        <>
          <Text variant="boldBlackCenter18">
            {getFormattedPeriod(new Date(p.periodStart), new Date(p.periodEnd))}
          </Text>
          <Text variant="body1" marginTop="xs" marginBottom="l">
            {t('pickedPTO', { days: String(p.ptoTaken) })}
          </Text>
          <CustomButton label={t('select')} variant="primary" onPress={p.onSubmit} />
        </>
      )}
    </AnimatedBox>
  )
}
