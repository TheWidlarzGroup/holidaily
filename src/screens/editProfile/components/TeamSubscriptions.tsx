import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, theme } from 'utils/theme'
import IconAdd from 'assets/icons/icon-add.svg'

export const TeamSubscriptions: FC = () => {
  const { t } = useTranslation('userProfile')

  const [userTeams, setUserTeams] = useState<string[]>(['Smartsoft', 'Akademia'])

  const onAddSubscribedTeam = () => {
    console.log('add subscribed team')
    // TODO display modal to add new subscriptions
  }
  const onRemoveSubscribedTeam = (team: string) => {
    // TODO display modal to confirm changes
    setUserTeams(userTeams.filter((item: string) => item !== team))
  }

  return (
    <Box paddingHorizontal="m" marginBottom="l">
      <Text variant="label1" marginLeft="m" marginBottom="xm">
        {t('userSubscriptions')}
      </Text>
      <Box flexDirection="row" position="relative">
        <BaseOpacity
          onPress={onAddSubscribedTeam}
          justifyContent="center"
          alignItems="center"
          position="absolute"
          right={0}
          top={0}
          height={44}
          width={44}
          borderRadius={44 / 2}
          backgroundColor="lightGrey">
          <IconAdd />
        </BaseOpacity>
        {userTeams.map((team, idx) => (
          <BaseOpacity
            onPress={() => onRemoveSubscribedTeam(team)}
            key={idx}
            style={styles.teamBtn}>
            <Text variant="resendWhite" marginRight={8} paddingHorizontal={20} paddingVertical={12}>
              {team}
            </Text>
          </BaseOpacity>
        ))}
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  teamBtn: {
    backgroundColor: theme.colors.black,
    borderRadius: 100,
  },
})
