import React, { FC, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { FormInput } from 'components/FormInput'
import { useForm } from 'react-hook-form'
import { useCreateInvitations } from 'legacy/api-hooks/useCreateInvitations'
import { emailRegex, minOneWordRegex } from 'utils/regex'
import { CustomButton } from 'components/CustomButton'
import { DropdownWithRadio } from 'components/DropdownWithRadio'
import { CreateInvitationTypes, roles, RoleTypes } from 'types/useCreateInvitationTypes'

export const InviteMembers: FC = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { control, handleSubmit, errors, reset, setValue } = useForm()
  const { createInvitations, isLoading, isSuccess } = useCreateInvitations()
  const [selectedRole, setSelectedRole] = React.useState('USER')

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleSelectRole = useCallback(
    (role: RoleTypes) => {
      setSelectedRole(role)
      setValue('role', role)
    },
    [setValue]
  )

  useEffect(() => {
    if (isSuccess) {
      reset()
      handleSelectRole('USER')
    }
  }, [handleSelectRole, isSuccess, reset])

  const onCreateInvitation = handleSubmit((data: CreateInvitationTypes) => {
    createInvitations([data])
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
        <Box style={{ display: 'none' }}>
          <FormInput
            control={control}
            isError={!!errors.role}
            errors={errors}
            name="role"
            inputLabel="Role"
            validationPattern={minOneWordRegex}
            errorMessage="Incorrect role"
            autoCapitalize="none"
            blurOnSubmit={false}
          />
        </Box>
        <DropdownWithRadio
          label="Role"
          options={roles}
          selectedOption={selectedRole}
          setSelectedOption={handleSelectRole}
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
