import React, { useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FormInput } from 'components/FormInput'
import IconEdit from 'assets/icons/icon-edit.svg'
import { Box, BaseOpacity, useTheme } from 'utils/theme/'
import { noEmojiRegex } from 'utils/regex'
import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form'
// import { InputButton } from 'components/InputButton'
// import { useNavigation } from '@react-navigation/native'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  errors: DeepMap<{ firstName: string; lastName: string; occupation: string }, FieldError>
  control: Control<FieldValues>
}
const validationPattern = noEmojiRegex
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
  const errorMessage = t('fieldRequired')
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
  const commonInputProps = {
    maxLength: 15,
    control,
    onBlur: onSubmitEditing,
    errors,
    validationPattern,
    errorMessage,
    labelTextVariant: 'labelGrey',
    inputTextVariant: 'bold',
  } as const
  return (
    <Box paddingHorizontal="m">
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          onFocus={() => setIconInvisible(0)}
          isError={!!errors.firstName}
          name="firstName"
          inputLabel={t('userFirstName')}
          ref={inputsRefs[0]}
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
          {...commonInputProps}
          onFocus={() => setIconInvisible(1)}
          isError={!!errors.lastName}
          name="lastName"
          inputLabel={t('userLastName')}
          ref={inputsRefs[1]}
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
          {...commonInputProps}
          maxLength={20}
          onBlur={onSubmitEditing}
          onFocus={() => setIconInvisible(2)}
          isError={!!errors.occupation}
          name="occupation"
          inputLabel={t('userOccupation')}
          ref={inputsRefs[2]}
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
