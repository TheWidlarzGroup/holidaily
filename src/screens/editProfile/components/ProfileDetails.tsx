import React, { useRef } from 'react'
import { TextInput, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { FormInput } from 'components/FormInput'
import IconEdit from 'assets/icons/icon-edit-grey.svg'
import { theme, mkUseStyles, Theme, Box } from 'utils/theme/'
import { minTwoWordsRegex, minOneSignRegex, passwordRegex } from 'utils/regex'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileDetails = ({ setIsEdited }: UserData) => {
  const { control, errors } = useForm()
  const styles = useStyles()
  const { t } = useTranslation('userProfile')
  const inputsRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]

  const onSubmitEditing = () => {
    setIsEdited(true)
  }
  const onFocusInput = (index: number) => {
    if (index === 2) {
      // TODO: open update password modal
      return
    }
    inputsRefs[index]?.current?.focus()
  }

  return (
    <Box paddingHorizontal="m">
      <Box position="relative">
        <FormInput
          control={control}
          isError={!!errors.nameSurname}
          errors={errors}
          name="nameSurname"
          inputLabel={t('userNameSurname')}
          validationPattern={minTwoWordsRegex}
          errorMessage={t('editDetailsErrMsg')}
          keyboardType="default"
          autoCompleteType="off"
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[0]}
        />
        <View style={styles.editButton}>
          <RectButton
            onPress={() => onFocusInput(0)}
            activeOpacity={0.2}
            rippleColor={theme.colors.rippleColor}>
            <IconEdit />
          </RectButton>
        </View>
      </Box>
      <Box>
        <FormInput
          control={control}
          isError={!!errors.role}
          errors={errors}
          name="role"
          inputLabel={t('userRole')}
          validationPattern={minOneSignRegex}
          errorMessage={t('editDetailsErrMsg')}
          keyboardType="default"
          autoCompleteType="off"
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[1]}
        />
        <View style={styles.editButton}>
          <RectButton
            onPress={() => onFocusInput(1)}
            activeOpacity={0.2}
            rippleColor={theme.colors.rippleColor}>
            <IconEdit />
          </RectButton>
        </View>
      </Box>
      <Box>
        <FormInput
          control={control}
          isError={!!errors.password}
          errors={errors}
          name="password"
          inputLabel={t('userPassword')}
          validationPattern={passwordRegex}
          errorMessage={t('editDetailsErrMsg')}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry
          ref={inputsRefs[2]}
          onFocus={() => onFocusInput(2)}
        />
        <View style={styles.editButton}>
          <RectButton
            onPress={() => onFocusInput(2)}
            activeOpacity={0.2}
            rippleColor={theme.colors.rippleColor}>
            <IconEdit />
          </RectButton>
        </View>
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  editButton: {
    position: 'absolute',
    right: 0,
    top: 22,
    backgroundColor: theme.colors.lightGrey,
    borderRadius: theme.borderRadii.full,
    width: 55,
    height: 55,
    borderWidth: theme.spacing.xs,
    borderColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
