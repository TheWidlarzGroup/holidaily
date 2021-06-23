import React, { useEffect } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { useForm } from 'react-hook-form'
import { useBooleanState } from 'hooks/useBooleanState'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FormInput } from 'components/FormInput'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { CustomButton } from 'components/CustomButton'
import { checkIfPasswordsMatch } from 'utils/checkIfPasswordsMatch'
import { passwordRegex } from 'utils/regex'
import { Box, Text, theme, mkUseStyles, Theme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'

export const ChangePassword = () => {
  const { control, handleSubmit, errors, watch } = useForm()
  const { t } = useTranslation('password')
  const styles = useStyles()
  const { goBack, navigate } = useNavigation()
  const navigateToForgotPassword = () => navigate('Recovery')
  const [isModalVisible, { toggle: toggleModal }] = useBooleanState(false)
  const [arePasswordsEqual, { setFalse: setPasswordsAreNotEqual, setTrue: setArePasswordsEqual }] =
    useBooleanState(true)
  const { newPassword, confNewPassword } = watch(['newPassword', 'confNewPassword'])

  const handleChangePassword = () => {
    // const { currPassword, newPassword, confNewPassword } = getValues()
    // TODO: check if current password matches and update new password
    if (arePasswordsEqual) toggleModal()
  }

  useEffect(() => {
    const passwordsAreEqual = checkIfPasswordsMatch(newPassword, confNewPassword)

    if (!passwordsAreEqual) {
      setPasswordsAreNotEqual()
    } else {
      setArePasswordsEqual()
    }
  }, [newPassword, confNewPassword, setArePasswordsEqual, setPasswordsAreNotEqual, watch])

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.modalBackdrop)
    return () => StatusBar.setBackgroundColor('white')
  }, [])

  return (
    <SafeAreaWrapper>
      <Box flex={1} backgroundColor="modalBackdrop">
        <Box
          flex={1}
          backgroundColor="white"
          marginTop="xm"
          borderTopRightRadius="lmin"
          borderTopLeftRadius="lmin"
          padding="l"
          style={styles.shadow}>
          {isModalVisible && (
            <ChangesSavedModal
              isVisible
              hideModal={() => toggleModal()}
              content={t('newPasswordSaved')}
            />
          )}
          <TouchableOpacity activeOpacity={0.2} onPress={goBack} style={styles.backBtn}>
            <IconBack />
          </TouchableOpacity>
          <Text variant="boldBlackCenter20" marginBottom="xxxxl">
            {t('passwordChange')}
          </Text>
          <FormInput
            control={control}
            errors={errors}
            name={'currPassword'}
            inputLabel={t('currPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            isError={!!errors.password}
          />
          <RectButton
            rippleColor={theme.colors.rippleColor}
            activeOpacity={0.2}
            onPress={navigateToForgotPassword}
            style={styles.forgottenPasswordBtn}>
            <Text variant="labelGrey">{'Forgot your password?'}</Text>
          </RectButton>
          <FormInput
            control={control}
            errors={errors}
            name={'newPassword'}
            inputLabel={t('newPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            isError={!!errors.newPassword}
          />
          <FormInput
            control={control}
            errors={errors}
            name={'confNewPassword'}
            inputLabel={t('confirmNewPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            isError={!!errors.confNewPassword}
          />
          <Box position="absolute" bottom={16} alignSelf="center">
            <CustomButton
              label={'Save'}
              variant="primary"
              onPress={handleSubmit(handleChangePassword)}
              width={221}
              height={53}
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    elevation: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 17,
    zIndex: theme.zIndices['5'],
  },
  forgottenPasswordBtn: {
    marginTop: -18,
    marginBottom: theme.spacing.lplus,
    marginRight: theme.spacing.xs,
    alignItems: 'flex-end',
  },
}))
