import React, { useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { FormInput } from 'components/FormInput'
import IconEdit from 'assets/icons/icon-edit-grey.svg'
import { theme, Box } from 'utils/theme/'
import { minOneSignRegex } from 'utils/regex'
import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form'
import { InputButton } from 'components/InputButton'
import { useNavigation } from '@react-navigation/native'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  errors: DeepMap<{ firstName: string; lastName: string; role: string }, FieldError>
  control: Control<FieldValues>
}

export const ProfileDetails = ({ errors, control, setIsEdited }: UserData) => {
  const { t } = useTranslation('userProfile')

  const inputsRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]
  const [iconInvisible, setIconInvisible] = useState<number>(-1)

  const onSubmitEditing = () => {
    setIsEdited(true)
    setIconInvisible(-1)
  }
  const onFocusInput = (index: number) => {
    if (index === 3) {
      // TODO: open update password modal
      return
    }
    inputsRefs[index]?.current?.focus()
    setIconInvisible(index)
  }
  const navigation = useNavigation()
  const navigateToChangePassword = () => navigation.navigate('ChangePassword')

  return (
    <Box paddingHorizontal="m">
      <Box position="relative">
        <FormInput
          onFocus={() => setIconInvisible(0)}
          control={control}
          isError={!!errors.firstName}
          errors={errors}
          name="firstName"
          inputLabel={t('userFirstName')}
          validationPattern={minOneSignRegex}
          errorMessage={t('editDetailsErrMsg')}
          onSubmitEditing={onSubmitEditing}
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
            <RectButton
              onPress={() => onFocusInput(0)}
              activeOpacity={0.2}
              rippleColor={theme.colors.rippleColor}>
              <IconEdit />
            </RectButton>
          </Box>
        )}
      </Box>
      <Box position="relative">
        <FormInput
          onFocus={() => setIconInvisible(1)}
          control={control}
          isError={!!errors.lastName}
          errors={errors}
          name="lastName"
          inputLabel={t('userLastName')}
          validationPattern={minOneSignRegex}
          errorMessage={t('editDetailsErrMsg')}
          onSubmitEditing={onSubmitEditing}
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
            <RectButton
              onPress={() => onFocusInput(1)}
              activeOpacity={0.2}
              rippleColor={theme.colors.rippleColor}>
              <IconEdit />
            </RectButton>
          </Box>
        )}
      </Box>
      <Box position="relative">
        <FormInput
          onFocus={() => setIconInvisible(2)}
          control={control}
          isError={!!errors.role}
          errors={errors}
          name="role"
          inputLabel={t('userRole')}
          validationPattern={minOneSignRegex}
          errorMessage={t('editDetailsErrMsg')}
          onSubmitEditing={onSubmitEditing}
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
            <RectButton
              onPress={() => onFocusInput(2)}
              activeOpacity={0.2}
              rippleColor={theme.colors.rippleColor}>
              <IconEdit />
            </RectButton>
          </Box>
        )}
      </Box>
      <Box marginBottom="l">
        <InputButton
          inputLabel={'Password'}
          value={'••••••••'}
          onClick={navigateToChangePassword}
          showEditIcon
        />
      </Box>
    </Box>
  )
}
