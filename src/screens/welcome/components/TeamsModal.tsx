import React from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconClose from 'assets/icons/icon-close2.svg'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { CustomButton } from 'components/CustomButton'
import { USER_GROUPS_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfGroupDayOff } from 'types/holidaysDataTypes'

import { isIos } from 'utils/layout'
import { Indicator } from 'components/Indicator'

const teamsList: ValidationOfGroupDayOff[] = USER_GROUPS_DAYS_OFF // fetch Team from mirage and remove this type

export const TeamsModal = ({ closeModal }: { closeModal: F0 }) => {
  const { t } = useTranslation('welcome')

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box backgroundColor="white" flexGrow={1} paddingHorizontal="m" marginTop={isIos ? '-l' : 0}>
        <Box alignItems="center" flexDirection="row" marginLeft="xs" marginBottom="s">
          <Indicator />
          <TouchableOpacity
            onPress={closeModal}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <IconClose height={15} width={15} />
          </TouchableOpacity>
        </Box>
        <Box flex={1}>
          <Text variant="body1">{t('memberOf')}</Text>
          <Text textAlign="center" variant="boldOrange20" marginTop="s">
            Supercompany
          </Text>
          <Box>
            <Text textAlign="left" variant="body1" marginTop="l" marginBottom="s">
              {t('yourTeams')}
            </Text>
            {teamsList.map((team) => (
              <Text key={team.groupId} variant="boldBlack18" marginTop="s">
                {team.groupName}
              </Text>
            ))}
          </Box>
        </Box>
        <Box maxWidth={250} alignSelf="center" marginBottom="l">
          <CustomButton variant="primary" label={t('thanksButton')} onPress={closeModal} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
