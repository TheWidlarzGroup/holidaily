import React, { useCallback } from 'react'
import { Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import Info from 'assets/icons/icon-info.svg'
import { useNavigation } from '@react-navigation/native'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const AvailablePto = ({ availablePto }: { availablePto: number }) => {
  const { t } = useTranslation('budget')
  const { data: organization } = useGetOrganization()
  const PTO_LIMIT = organization?.maxPtoDays ?? 26
  const theme = useTheme()
  const styles = useStyles()
  const navigation = useNavigation()

  const onInfoPress = useCallback(() => {
    navigation.navigate('PtoPolicy', {
      screen: 'BudgetNavigation',
    })
  }, [navigation])

  return (
    <Box>
      <Box flexDirection="row-reverse" justifyContent="space-between">
        <TouchableOpacity
          style={{ transform: [{ translateX: 5 }, { translateY: -5 }] }}
          onPress={onInfoPress}>
          <Info color={theme.colors.headerGrey} />
        </TouchableOpacity>
        <Box>
          <Text marginTop="xxm" variant="captionText" lineHeight={14}>
            {t('have')}
          </Text>
          <Text marginVertical="xxm" variant="bold24" color="tertiary">
            {t('left', { number: availablePto })}
          </Text>
          <Text marginBottom="xm" variant="lightGreyRegular">
            {t('of', { number: String(PTO_LIMIT) })}
          </Text>
        </Box>
      </Box>
      <Box
        style={[styles.progressTranslation]}
        width={`${(availablePto / PTO_LIMIT) * 100}%`}
        height={theme.spacing.xs}
        backgroundColor="tertiary"
        zIndex="2"
      />
      <Box width="100%" height={theme.spacing.xs} backgroundColor="headerGrey" />
    </Box>
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
    borderWidth: 3,
    borderColor: 'transparent',

    right: 0,
  },
}))
