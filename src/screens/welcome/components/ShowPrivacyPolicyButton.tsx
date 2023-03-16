import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BaseOpacity, Text } from 'utils/theme/index'

type Props = {
  onPress: F0
}

export const ShowPrivacyPolicyButton = ({ onPress }: Props) => {
  const { t } = useTranslation('welcome')
  return (
    <BaseOpacity marginBottom="xl" paddingHorizontal="l" onPress={onPress}>
      <Text variant="lightGreyRegular" textAlign="left">
        <Trans
          t={t}
          i18nKey="privacyPolicyNormal"
          components={{
            b: <Text variant="lightGreyRegularBold" textAlign="left" />,
          }}
          values={{ btnLabel: t('seeDemoButton') }}
        />

        <Text variant="lightGreyRegularBold" textAlign="center" color="primary">
          {t('privacyPolicyAccent')}
        </Text>
      </Text>
    </BaseOpacity>
  )
}
