import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'
import { TextLink } from 'components/TextLink'
import { useRetriggerAccountConfirmationEmail } from 'hooks/useRetriggerAccountConfirmationEmail'
import { ActivityIndicator } from 'react-native'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'
import { useForm } from 'react-hook-form'
import { FormInput } from 'components/FormInput'

export const SecondStepRequestVacation: FC = () => {
  return (
    <Box>
      <Text variant="title1">Step 2</Text>
    </Box>
  )
}
