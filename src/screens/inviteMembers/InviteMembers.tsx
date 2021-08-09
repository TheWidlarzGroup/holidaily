import React, { FC, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { FormInput } from 'components/FormInput'
import { useForm } from 'react-hook-form'
import { useCreateInvitation } from 'hooks/useCreateInvitation'
import { emailRegex } from 'utils/regex'
import { CustomButton } from 'components/CustomButton'
import { getItemAsync } from 'expo-secure-store'

export const InviteMembers: FC = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { control, handleSubmit, errors, reset } = useForm()
  const { createInvitation, isLoading } = useCreateInvitation()

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  const onCreateInvitation = handleSubmit(async (data: { email: string }) => {
    const token = await getItemAsync('token')
    if (token !== null) createInvitation({ ...data, token })
    reset()
  })

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={'Invite member'} />
      <Box marginHorizontal="m" flex={1} marginTop="xl">
        <FormInput
          control={control}
          isError={!!errors.email}
          errors={errors}
          name="email"
          inputLabel="Member's E-mail Address"
          validationPattern={emailRegex}
          errorMessage="Incorrect email, please try again"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
          blurOnSubmit={false}
        />
      </Box>
      <CustomButton
        onPress={onCreateInvitation}
        label="Invite"
        variant="primary"
        loading={isLoading}
      />
    </SafeAreaWrapper>
  )
}
