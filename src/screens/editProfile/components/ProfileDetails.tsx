import React, { useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FormInput } from 'components/FormInput'
import IconEdit from 'assets/icons/icon-edit.svg'
import { Box, BaseOpacity, useTheme } from 'utils/theme/'
import { minMaxSignsRegex } from 'utils/regex'
import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form'
// import { InputButton } from 'components/InputButton'
// import { useNavigation } from '@react-navigation/native'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  errors: DeepMap<{ firstName: string; lastName: string; occupation: string }, FieldError>
  control: Control<FieldValues>
}
const MIN_SIGNS = 1
const MAX_SIGNS = 20
const validationPattern = minMaxSignsRegex(MIN_SIGNS, MAX_SIGNS)
export const ProfileDetails = ({ errors, control, setIsEdited }: UserData) => {
  const { t } = useTranslation('userProfile')
  const theme = useTheme()
  const inputsRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]
  const [iconInvisible, setIconInvisible] = useState<number>(-1)
  const errorMessage = t('fieldRequired', { min: MIN_SIGNS, max: MAX_SIGNS })
  const onSubmitEditing = () => {
    setIsEdited(true)
    setIconInvisible(-1)
  }
  const onFocusInput = (index: number) => {
    if (index === 3) {
      return
    }
    inputsRefs[index]?.current?.focus()
    setIconInvisible(index)
  }
  // const navigation = useNavigation()
  // const navigateToChangePassword = () => navigation.navigate('ChangePassword')

  return (
    <Box paddingHorizontal="m">
      <Box position="relative">
        <FormInput
          maxLength={15}
          onBlur={onSubmitEditing}
          onFocus={() => setIconInvisible(0)}
          control={control}
          isError={!!errors.firstName}
          errors={errors}
          name="firstName"
          inputLabel={t('userFirstName')}
          validationPattern={validationPattern}
          errorMessage={errorMessage}
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[0]}
          labelTextVariant="labelGrey"
          inputTextVariant="bold"
        />
        {iconInvisible !== 0 && (
          <Box
            position="absolute"
            right={0}
            top={20}
            backgroundColor="lightGrey"
            borderRadius="full"
            width={58}
            height={58}
            borderWidth={4}
            borderColor="white"
            justifyContent="center"
            alignItems="center">
            <BaseOpacity onPress={() => onFocusInput(0)} activeOpacity={0.2}>
              <IconEdit color={theme.colors.headerGrey} />
            </BaseOpacity>
          </Box>
        )}
      </Box>
      <Box position="relative">
        <FormInput
          maxLength={15}
          onBlur={onSubmitEditing}
          onFocus={() => setIconInvisible(1)}
          control={control}
          isError={!!errors.lastName}
          errors={errors}
          name="lastName"
          inputLabel={t('userLastName')}
          validationPattern={validationPattern}
          errorMessage={errorMessage}
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[1]}
          labelTextVariant="labelGrey"
          inputTextVariant="bold"
        />
        {iconInvisible !== 1 && (
          <Box
            position="absolute"
            right={0}
            top={20}
            backgroundColor="lightGrey"
            borderRadius="full"
            width={58}
            height={58}
            borderWidth={4}
            borderColor="white"
            justifyContent="center"
            alignItems="center">
            <BaseOpacity onPress={() => onFocusInput(1)} activeOpacity={0.2}>
              <IconEdit color={theme.colors.headerGrey} />
            </BaseOpacity>
          </Box>
        )}
      </Box>
      <Box position="relative">
        <FormInput
          maxLength={20}
          onBlur={onSubmitEditing}
          onFocus={() => setIconInvisible(2)}
          control={control}
          isError={!!errors.occupation}
          errors={errors}
          name="occupation"
          inputLabel={t('userOccupation')}
          validationPattern={validationPattern}
          errorMessage={errorMessage}
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[2]}
          labelTextVariant="labelGrey"
          inputTextVariant="bold"
        />
        {iconInvisible !== 2 && (
          <Box
            position="absolute"
            right={0}
            top={20}
            backgroundColor="lightGrey"
            borderRadius="full"
            width={58}
            height={58}
            borderWidth={4}
            borderColor="white"
            justifyContent="center"
            alignItems="center">
            <BaseOpacity onPress={() => onFocusInput(2)} activeOpacity={0.2}>
              <IconEdit color={theme.colors.headerGrey} />
            </BaseOpacity>
          </Box>
        )}
      </Box>
      {/* <Box marginBottom="l">
        <InputButton
          inputLabel={t('userPassword')}
          value={'••••••••'}
          onClick={navigateToChangePassword}
          showEditIcon
          labelTextVariant="labelGrey"
        />
      </Box> */}
    </Box>
  )
}
