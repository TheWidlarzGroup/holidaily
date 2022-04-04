import React from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconClose from 'assets/icons/icon-close2.svg'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { CustomButton } from 'components/CustomButton'
import { USER_GROUPS_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfGroupDayOff } from 'types/holidaysDataTypes'
import LocalStorage from 'utils/localStorage'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { useUserContext } from 'hooks/useUserContext'

const teamsList: ValidationOfGroupDayOff[] = USER_GROUPS_DAYS_OFF // fetch Team from mirage and remove this type

export const TeamsModal = ({ firstName }: { firstName: string }) => {
  const { t } = useTranslation('welcome')
  const { mutate: createTempUser } = useCreateTempUser()
  const { updateUser } = useUserContext()

  const handleOnSubmit = async () => {
    await LocalStorage.setItem('firstName', firstName)
    createTempUser({ firstName }, { onSuccess: (data) => updateUser(data.user) })
  }

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box backgroundColor="white" flexGrow={1} paddingHorizontal="m">
        <Box alignItems="center" flexDirection="row" marginLeft="xs" marginBottom="s">
          <TouchableOpacity
            onPress={handleOnSubmit}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
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
          <CustomButton variant="primary" label={t('thanksButton')} onPress={handleOnSubmit} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
