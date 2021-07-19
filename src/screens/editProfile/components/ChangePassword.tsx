import React, { useEffect } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useModalContext } from 'contexts/ModalProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FormInput } from 'components/FormInput'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { CustomButton } from 'components/CustomButton'
import { checkIfPasswordsMatch } from 'utils/checkIfPasswordsMatch'
import { passwordRegex } from 'utils/regex'
import { Box, Text, mkUseStyles, Theme, BaseOpacity } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'
import { ConfirmationModal } from 'components/ConfirmationModal'

export const ChangePassword = () => {
  const { control, handleSubmit, errors, watch, reset: resetForm } = useForm()
  const { showModal, hideModal } = useModalContext()
  const { t } = useTranslation('changePassword')
  const styles = useStyles()
  const { goBack, navigate } = useNavigation()
  const navigateToForgotPassword = () => navigate('Recovery')
  const [arePasswordsEqual, { setFalse: setPasswordsAreNotEqual, setTrue: setArePasswordsEqual }] =
    useBooleanState(true)
  const [
    userEditedPassword,
    { setTrue: setUserEditedPassword, setFalse: setUserDidNotEditedPassword },
  ] = useBooleanState(false)
  const { newPassword, confNewPassword } = watch(['newPassword', 'confNewPassword'])

  const handleChangePassword = () => {
    // const { currPassword, newPassword, confNewPassword } = getValues()
    // TODO: check if current password matches and update new password
    if (arePasswordsEqual) {
      showModal(
        <ChangesSavedModal isVisible hideModal={hideModal} content={t('newPasswordSaved')} />
      )
      setUserDidNotEditedPassword()
      resetForm()
    }
  }
  const handleGoBack = () => {
    if (userEditedPassword) {
      showModal(
        <ConfirmationModal
          isVisible
          hideModal={hideModal}
          onAccept={() => {
            hideModal()
            goBack()
          }}
          onDecline={hideModal}
          content={t('exitMessage')}
        />
      )
    } else {
      goBack()
    }
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
    StatusBar.setBarStyle('dark-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
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
          <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack} style={styles.backBtn}>
            <IconBack />
          </TouchableOpacity>
          <Text variant="boldBlackCenter20" marginBottom="xxxxl">
            {t('passwordChange')}
          </Text>
          <FormInput
            control={control}
            errors={errors}
            screenName="ChangePassword"
            name={'currPassword'}
            inputLabel={t('currPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            isError={!!errors.currPassword}
            onFocus={setUserEditedPassword}
          />
          <BaseOpacity
            activeOpacity={0.5}
            onPress={navigateToForgotPassword}
            style={styles.forgottenPasswordBtn}>
            <Text variant="labelGrey">{t('forgotPasswordMessage')}</Text>
          </BaseOpacity>
          <FormInput
            control={control}
            errors={errors}
            screenName="ChangePassword"
            name={'newPassword'}
            inputLabel={t('newPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            passwordsAreEqual={arePasswordsEqual}
            isError={!!errors.newPassword}
            onFocus={setUserEditedPassword}
          />
          <FormInput
            control={control}
            errors={errors}
            screenName="ChangePassword"
            name={'confNewPassword'}
            inputLabel={t('confirmNewPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            passwordsAreEqual={arePasswordsEqual}
            isError={!!errors.confNewPassword || !arePasswordsEqual}
            onFocus={setUserEditedPassword}
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
    marginBottom: theme.spacing.lplus,
    marginRight: theme.spacing.xs,
    alignSelf: 'flex-end',
  },
}))
