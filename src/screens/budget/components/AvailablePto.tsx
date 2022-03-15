import React, { useCallback } from 'react'
import { BaseOpacity, Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import Info from 'assets/icons/icon-info.svg'
import { useNavigation } from '@react-navigation/native'

export const AvailablePto = ({ availablePto }: { availablePto: number }) => {
  const { t } = useTranslation('budget')
  const theme = useTheme()
  const styles = useStyles()
  const navigation = useNavigation()

  const onInfoPress = useCallback(() => {
    navigation.navigate('PtoPolicy', {
      screen: 'BudgetNavigation',
    })
  }, [navigation])

  return (
    <>
      <BaseOpacity style={[styles.infoPressable]} onPress={onInfoPress}>
        <Info color={theme.colors.headerGrey} />
      </BaseOpacity>

      <Text marginTop="xxm" variant="captionText" lineHeight={14}>
        {t('have')}
      </Text>
      <Text marginVertical="xxm" variant="bold24" color="tertiary">
        {t('left', { number: availablePto })}
      </Text>
      <Text marginBottom="xm" variant="lightGreyRegular">
        {t('of', { number: String(PTO_LIMIT) })}
      </Text>
      <Box
        style={[styles.progressTranslation]}
        width={`${(availablePto / PTO_LIMIT) * 100}%`}
        height={theme.spacing.xs}
        backgroundColor="tertiary"
        zIndex="2"
      />
      <Box width="100%" height={theme.spacing.xs} backgroundColor="headerGrey" />
    </>
  )
}
const useStyles = mkUseStyles(() => ({
  progressTranslation: {
    transform: [
      {
        translateY: 4,
      },
    ],
  },
  infoPressable: {
    position: 'absolute',
    right: 0,
  },
}))

// TODO:This should come from the backend as an internal company policy
const PTO_LIMIT = 26
