import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useModalContext } from 'contexts/ModalProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { useChangePassword } from 'hooks/legacy-api-hooks/useChangePassword'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { FormInput } from 'components/FormInput'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { CustomButton } from 'components/CustomButton'
import { LoadingModal } from 'components/LoadingModal'
import { ChangePasswordTypes } from 'types/useChangePasswordTypes'
import { checkIfPasswordsMatch } from 'utils/checkIfPasswordsMatch'
import { passwordRegex } from 'utils/regex'
import { Box, Text, mkUseStyles, Theme, BaseOpacity } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'

export const ChangePassword = () => {
  const { handleChangePassword, isSuccess, isLoading } = useChangePassword()
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
    { setTrue: setUserEditedPassword, setFalse: setUserDidNotEditPassword },
  ] = useBooleanState(false)
  const { newPassword, newPasswordConfirmation } = watch(['newPassword', 'newPasswordConfirmation'])

  const onChangePassword = (values: ChangePasswordTypes) => {
    if (arePasswordsEqual) {
      handleChangePassword(values)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      showModal(
        <ChangesSavedModal isVisible hideModal={hideModal} content={'New password saved!'} />
      )
      setUserDidNotEditPassword()
      resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

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
    const passwordsAreEqual = checkIfPasswordsMatch(newPassword, newPasswordConfirmation)

    if (!passwordsAreEqual) {
      setPasswordsAreNotEqual()
    } else {
      setArePasswordsEqual()
    }
  }, [newPassword, newPasswordConfirmation, setArePasswordsEqual, setPasswordsAreNotEqual, watch])

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
            name={'password'}
            inputLabel={t('currPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            isError={!!errors.password}
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
            name={'newPasswordConfirmation'}
            inputLabel={t('confirmNewPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('incorrectPassword')}
            isPasswordIconVisible
            passwordsAreEqual={arePasswordsEqual}
            isError={!!errors.newPasswordConfirmation || !arePasswordsEqual}
            onFocus={setUserEditedPassword}
          />
          <Box position="absolute" bottom={16} alignSelf="center">
            <CustomButton
              label={t('save')}
              variant="primary"
              onPress={handleSubmit(onChangePassword)}
              width={221}
              height={53}
            />
            <LoadingModal show={isLoading} />
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
