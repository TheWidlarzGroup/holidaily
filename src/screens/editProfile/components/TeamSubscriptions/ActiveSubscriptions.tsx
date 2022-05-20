import React, { useMemo } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Text, Theme, useTheme } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { useBooleanState } from 'hooks/useBooleanState'
import { ConfirmationModal } from 'components/ConfirmationModal'
import CrossIcon from 'assets/icons/icon-close.svg'
import { useTranslation } from 'react-i18next'

type ActiveSubscriptionsProps = {
  teams: TeamsType[]
  removeSubscription: F1<string>
}

type SubscriptionProps = {
  teamName: string
  removeSubscription: F1<string>
  keepSpaceForAddButton?: boolean
}

export const ActiveSubscriptions = ({ teams, removeSubscription }: ActiveSubscriptionsProps) => {
  const teamElements = useMemo(
    () =>
      teams.map(({ teamName, id }, idx) => (
        <Subscription
          teamName={teamName}
          key={id}
          keepSpaceForAddButton={idx === teams.length - 1}
          removeSubscription={removeSubscription}
        />
      )),
    [teams, removeSubscription]
  )
  return (
    <Box flexDirection="row" flexWrap="wrap" flex={1} marginHorizontal="s">
      {teamElements}
    </Box>
  )
}

const Subscription = (p: SubscriptionProps) => {
  const [isConfirmationNeeded, { setTrue: askForConfirmation, setFalse: dismissConfirmation }] =
    useBooleanState(false)
  const theme = useTheme()
  const styles = useStyles()
  const { t } = useTranslation('userProfile')

  return (
    <Box marginRight={p.keepSpaceForAddButton ? 'xxl' : undefined}>
      <RectButton onPress={askForConfirmation} style={styles.team}>
        <Text variant="resendWhite" paddingVertical="xm" marginRight="s" color="alwaysWhite">
          {p.teamName}
        </Text>
        <CrossIcon height={12} color={theme.colors.alwaysWhite} />
      </RectButton>
      <ConfirmationModal
        isVisible={isConfirmationNeeded}
        content={t('ifYouUnsubscribe', { teamName: p.teamName })}
        onAccept={() => {
          dismissConfirmation()
          p.removeSubscription(p.teamName)
        }}
        hideModal={dismissConfirmation}
        onDecline={dismissConfirmation}
      />
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  team: {
    height: 45,
    marginLeft: theme.spacing.s,
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.specialDarker,
    borderRadius: theme.spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
}))
