import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import CheckmarkIcon from 'assets/icons/icon-checkmark-green.svg'
import CrossIcon from 'assets/icons/icon-cross-red.svg'
import { REQUEST_STATUS } from '../helpers'

type RequestStatusIconProps = {
  status: string
}

export const RequestStatusIcon = ({ status }: RequestStatusIconProps) => {
  const { t } = useTranslation('adminPanel')

  return (
    <Box alignItems="center">
      {status === REQUEST_STATUS.ACCEPTED ? <CheckmarkIcon /> : <CrossIcon />}
      <Text marginTop="xm" variant="lightGreyRegular">
        {t('changeBlockedMessage')}
      </Text>
    </Box>
  )
}
