import React from 'react'
import { Trans } from 'react-i18next'
import { Text } from 'utils/theme'

export const MAX_SICK_DAYS_COUNT = 20

export const MaxSickdays = () => (
  <Text marginBottom="l">
    {/* @ts-ignore */}
    <Trans
      ns="requestVacation"
      i18nKey="maxSickdaysError"
      values={{ max: MAX_SICK_DAYS_COUNT }}
      components={{
        b: <Text variant="body1Bold" textAlign="left" />,
      }}
    />
  </Text>
)
