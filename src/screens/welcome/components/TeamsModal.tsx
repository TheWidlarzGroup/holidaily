import React from 'react'
import { Box, Text, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { CustomButton } from 'components/CustomButton'
import { useUserContext } from 'hooks/useUserContext'
import IconPeople from 'assets/icons/icon-people.svg'
import { useNavigation } from '@react-navigation/native'
import { ToggleButton } from 'components/ToggleButton'
import { isScreenHeightShort } from 'utils/deviceSizes'

const ICON_SIZE = 18

export const TeamsModal = ({ closeModal }: { closeModal: F0 }) => {
  const { t } = useTranslation('welcome')
  const { user } = useUserContext()
  const theme = useTheme()
  const { navigate } = useNavigation()
  const screenSizeAwareSpacing = isScreenHeightShort ? 'xm' : 'l'
  return (
    <Box flex={1} borderTopLeftRadius="l1min" borderTopRightRadius="l1min" overflow="hidden">
      <Box backgroundColor="white" flexGrow={1} paddingVertical={screenSizeAwareSpacing}>
        <Box flex={1}>
          <TeamsModalHeader />
          <Box>
            <Text
              variant="displayXS"
              color="darkGrey"
              letterSpacing={0.7}
              marginTop={screenSizeAwareSpacing}
              marginBottom="xs">
              {t('yourTeams')}
            </Text>
            <Box flexDirection="row" flexWrap="wrap">
              {user?.teams.map((team) => (
                <ToggleButton key={team.name}>{team.name}</ToggleButton>
              ))}
            </Box>
            <Box
              backgroundColor="specialBrighterOpaque"
              borderRadius="lmin"
              marginTop={screenSizeAwareSpacing}
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
                  <IconPeople color={theme.colors.special} width={ICON_SIZE} height={ICON_SIZE} />
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
    </Box>
  )
}

const TeamsModalHeader = () => {
  const { t } = useTranslation('welcome')
  if (isScreenHeightShort)
    return (
      <>
        <Box flexDirection="row" justifyContent="center" alignItems="center" marginTop="xs">
          <Text variant="displayBoldSM" marginRight="xs">
            {t('congrats')}
          </Text>
          <Text variant="textSM">{t('memberOf')}</Text>
          <Text variant="textBoldSM" color="tertiary" marginLeft="xs">
            Supercompany
          </Text>
        </Box>
      </>
    )

  return (
    <>
      <Text variant="displayBoldSM" marginTop="s">
        {t('congrats')}
      </Text>
      <Box flexDirection="row" justifyContent="center" marginTop="xm">
        <Text variant="textSM">{t('memberOf')}</Text>
        <Text variant="textBoldSM" color="tertiary" marginLeft="xs">
          Supercompany
        </Text>
      </Box>
    </>
  )
}
