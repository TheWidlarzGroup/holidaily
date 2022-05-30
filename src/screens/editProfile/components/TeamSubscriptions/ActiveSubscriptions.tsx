import React, { useMemo } from 'react'
import { Box } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { useBooleanState } from 'hooks/useBooleanState'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useTranslation } from 'react-i18next'
import { TertiaryButton } from 'components/TertiaryButton'

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
    <Box flexDirection="row" flexWrap="wrap" flex={1} marginHorizontal="m">
      {teamElements}
    </Box>
  )
}

const Subscription = (p: SubscriptionProps) => {
  const [isConfirmationNeeded, { setTrue: askForConfirmation, setFalse: dismissConfirmation }] =
    useBooleanState(false)
  const { t } = useTranslation('userProfile')

  return (
    <Box marginRight={p.keepSpaceForAddButton ? 'xxl' : undefined}>
      <TertiaryButton onPress={askForConfirmation} teamName={p.teamName} isSelected />
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
