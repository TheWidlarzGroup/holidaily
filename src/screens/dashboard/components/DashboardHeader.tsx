import React, { FC } from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'
import { getDayName } from 'utils/dates'
import { formatDate } from 'utils/formatDate'
import { getCurrentLocale } from 'utils/locale'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation('dashboard')
  const navigation = useNavigation()
  const { user } = useUserContext()
  const date = [
    formatDate(new Date(), 'dayNumeralLongMonthNoYear', getCurrentLocale()),
    `(${getDayName(new Date())})`,
  ].join(' ')
  return (
    <Box marginVertical="m" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <BaseOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          bg="white"
          padding="xs"
          paddingLeft="m"
          borderTopRightRadius="lplus"
          borderBottomRightRadius="lplus">
          <IconProfile width={50} height={50} />
        </BaseOpacity>
        <Box alignItems="center" flex={1}>
          <Text variant="boldBlack18">{t('welcome', { name: user?.firstName })}</Text>
          <Text variant="lightGreyRegular" lineHeight={14}>
            {t('today', {
              date,
            })}
          </Text>
        </Box>
      </Box>
      <BaseOpacity padding="m">
        <IconBell />
      </BaseOpacity>
    </Box>
  )
}
