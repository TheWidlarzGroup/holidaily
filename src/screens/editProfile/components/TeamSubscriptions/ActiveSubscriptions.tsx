import React, { useMemo } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { useBooleanState } from 'hooks/useBooleanState'
import { ConfirmationModal } from 'components/ConfirmationModal'

type ActiveSubscriptionsProps = {
  teams: TeamsType[]
  removeSubscription: F1<string>
}

type SubscriptionProps = {
  teamName: string
  removeSubscription: F1<string>
}

export const ActiveSubscriptions = ({ teams, removeSubscription }: ActiveSubscriptionsProps) => {
  const teamElements = useMemo(
    () =>
      teams.map(({ teamName, id }) => (
        <Subscription teamName={teamName} key={id} removeSubscription={removeSubscription} />
      )),
    [teams, removeSubscription]
  )
  return (
    <Box flexDirection="row" marginRight="xl" flexWrap="wrap">
      {teamElements}
    </Box>
  )
}

const Subscription = (p: SubscriptionProps) => {
  const [isConfirmationNeeded, { setTrue: askForConfirmation, setFalse: dismissConfirmation }] =
    useBooleanState(false)

  const styles = useStyles()
  return (
    <>
      <RectButton onPress={askForConfirmation} style={styles.team}>
        <Text variant="resendWhite" paddingHorizontal="l" paddingVertical="xm" color="alwaysWhite">
          {p.teamName}
        </Text>
      </RectButton>
      <ConfirmationModal
        isVisible={isConfirmationNeeded}
        onAccept={() => {
          dismissConfirmation()
          p.removeSubscription(p.teamName)
        }}
        hideModal={dismissConfirmation}
        onDecline={dismissConfirmation}
      />
    </>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  team: {
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.alwaysDarkBlue,
    borderRadius: theme.spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
