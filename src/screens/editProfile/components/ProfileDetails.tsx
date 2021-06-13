import React, { useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { FormInput } from 'components/FormInput'
import IconEdit from 'assets/icons/icon-edit-grey.svg'
import { theme, mkUseStyles, Theme, Box } from 'utils/theme/'
import { minTwoWordsRegex, minOneSignRegex, passwordRegex } from 'utils/regex'
import { Control, FieldValues } from 'react-hook-form'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  errors: { nameSurname?: string; role?: string; password?: string }
  control: Control<FieldValues>
}

export const ProfileDetails = ({ errors, control, setIsEdited }: UserData) => {
  const styles = useStyles()
  const { t } = useTranslation('userProfile')
  const inputsRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]
  const [iconInvisible, setIconInvisible] = useState<number>(-1)

  const onSubmitEditing = () => {
    setIsEdited(true)
    setIconInvisible(-1)
  }
  const onFocusInput = (index: number) => {
    if (index === 2) {
      // TODO: open update password modal
      return
    }
    inputsRefs[index]?.current?.focus()
    setIconInvisible(index)
  }

  return (
    <Box paddingHorizontal="m">
      <Box position="relative">
        <FormInput
          onFocus={() => setIconInvisible(0)}
          control={control}
          isError={!!errors.nameSurname}
          errors={errors}
          name="nameSurname"
          inputLabel={t('userNameSurname')}
          validationPattern={minTwoWordsRegex}
          errorMessage={t('editDetailsErrMsg')}
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[0]}
        />
        {iconInvisible !== 0 && (
          <View style={styles.editButton}>
            <RectButton
              onPress={() => onFocusInput(0)}
              activeOpacity={0.2}
              rippleColor={theme.colors.rippleColor}>
              <IconEdit />
            </RectButton>
          </View>
        )}
      </Box>
      <Box>
        <FormInput
          onFocus={() => setIconInvisible(1)}
          control={control}
          isError={!!errors.role}
          errors={errors}
          name="role"
          inputLabel={t('userRole')}
          validationPattern={minOneSignRegex}
          errorMessage={t('editDetailsErrMsg')}
          onSubmitEditing={onSubmitEditing}
          ref={inputsRefs[1]}
        />
        {iconInvisible !== 1 && (
          <View style={styles.editButton}>
            <RectButton
              onPress={() => onFocusInput(1)}
              activeOpacity={0.2}
              rippleColor={theme.colors.rippleColor}>
              <IconEdit />
            </RectButton>
          </View>
        )}
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
