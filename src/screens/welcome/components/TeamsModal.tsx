import React from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconClose from 'assets/icons/icon-close2.svg'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { CustomButton } from 'components/CustomButton'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'
import { useUserContext } from 'hooks/useUserContext'
import IconPeople from 'assets/icons/icon-people.svg'
import { useNavigation } from '@react-navigation/native'

const ICON_SIZE = 18

export const TeamsModal = ({ closeModal }: { closeModal: F0 }) => {
  const { t } = useTranslation('welcome')
  const { user } = useUserContext()
  const { navigate } = useNavigation()
  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box backgroundColor="white" flexGrow={1} paddingHorizontal="m" paddingVertical="l">
        <Box alignItems="center" flexDirection="row" marginLeft="xs" marginBottom="s">
          <ModalHandleIndicator />
          <TouchableOpacity
            onPress={closeModal}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <IconClose height={15} width={15} color="black" />
          </TouchableOpacity>
        </Box>
        <Box flex={1}>
          <Text variant="displayBoldSM" marginTop="s">
            {t('congrats')}
          </Text>
          <Box flexDirection="row" justifyContent="center" marginTop="xm">
            <Text variant="textSM">{t('memberOf')}</Text>
            <Text variant="textBoldSM" color="tertiary" marginLeft="xs">
              Supercompany
            </Text>
          </Box>

          <Box>
            <Text
              variant="displayXS"
              color="darkGrey"
              letterSpacing={0.7}
              marginTop="l"
              marginBottom="xs">
              {t('yourTeams')}
            </Text>
            <Box flexDirection="row" flexWrap="wrap">
              {user?.teams.map((team) => (
                <Box
                  key={team.name}
                  height={37}
                  paddingHorizontal="m"
                  marginRight="s"
                  marginTop="s"
                  backgroundColor="input"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="l">
                  <Text variant="textSM">{team.name}</Text>
                </Box>
              ))}
            </Box>
            <Box
              backgroundColor="specialBrighterOpaque"
              borderRadius="lmin"
              marginTop="xl"
              padding="m">
              <Box flexDirection="row">
                <Box
                  height={36}
                  width={36}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="l"
                  backgroundColor="specialOpaque"
                  marginRight="m">
                  <IconPeople width={ICON_SIZE} height={ICON_SIZE} />
                </Box>
                <Box flex={1}>
                  <Text variant="textSM">{t('joinMore')}</Text>
                </Box>
              </Box>
              <Box alignSelf="flex-end" marginRight="-xm" marginTop="xm">
                <CustomButton
                  variant="tertiary"
                  label={t('joinMoreButton')}
                  width={120}
                  onPress={() => {
                    navigate('ProfileNavigation')
                    closeModal()
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <TouchableOpacity onPress={closeModal}>
          <CustomButton variant="primary" label={t('thanksButton')} />
        </TouchableOpacity>
      </Box>
    </SafeAreaWrapper>
  )
}
