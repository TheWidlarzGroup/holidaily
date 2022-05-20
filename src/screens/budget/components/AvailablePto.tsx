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
  const PTO_LIMIT = organization?.maxPtoDays ?? 21
  const theme = useTheme()
  const styles = useStyles()
  const navigation = useNavigation()

  const onInfoPress = useCallback(() => {
    navigation.navigate('PtoPolicy', {
      screen: 'BudgetNavigation',
    })
  }, [navigation])

  return (
    <Box
      bg="primaryOpaque"
      borderTopLeftRadius="l1min"
      borderTopRightRadius="l2min"
      marginBottom="s">
      <Box flexDirection="row-reverse" padding="xm" marginBottom="m" justifyContent="space-between">
        <TouchableOpacity
          style={{ transform: [{ translateX: 5 }, { translateY: -5 }] }}
          onPress={onInfoPress}>
          <Info color={theme.colors.tertiary} />
        </TouchableOpacity>
        <Box flex={1} alignItems="center">
          <Text
            marginTop="xxm"
            variant="textBoldSM"
            lineHeight={14}
            color="tertiary"
            style={styles.alignSelfStart}>
            {t('have')}
          </Text>
          <Text textAlign="center" variant="textBoldMD" color="titleActive">
            {t('left', { number: availablePto })}
          </Text>
          <Text variant="textSM" color="blackBrighter">
            {t('of', { number: String(PTO_LIMIT) })}
          </Text>
        </Box>
      </Box>
      <Box
        style={[styles.progressTranslation]}
        width={`${(availablePto / PTO_LIMIT) * 100}%`}
        height={theme.spacing.xs}
        backgroundColor="tertiary"
        borderRadius="m"
        zIndex="2"
      />
      <Box
        width="100%"
        height={theme.spacing.xs}
        backgroundColor="primaryOpaque"
        borderRadius="m"
      />
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
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
}))
