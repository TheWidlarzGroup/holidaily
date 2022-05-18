import React, { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'
import { onlyLettersRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { About } from 'screens/about/About'
import { setItem } from 'utils/localStorage'
import { isIos } from 'utils/layout'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { useUserContext } from 'hooks/useUserContext'
import { Toast } from 'components/Toast'
import { useBooleanState } from 'hooks/useBooleanState'
import { WelcomeTopBar } from './components/WelcomeTopBar'

const MIN_SIGNS = 2
const MAX_SIGNS = 20
// Comment: Using ref for isFirstVisit causes the state to be forget when auth stck navigation is unmounted. We don't want it
// The isFirstVisit is used to show toast when demo user logs out
let isFirstVisit = true

export const Welcome = () => {
  const styles = useStyles()
  const { t } = useTranslation('welcome')
  const { control, handleSubmit, errors, watch, reset } = useForm()
  const nameInput = watch('firstName')
  const modalRef = useRef<BottomSheetModal>(null)
  const openModal = useCallback(() => modalRef.current?.present(), [])
  const closeModal = useCallback(() => modalRef.current?.dismiss(), [])
  const [isToastVisible, { setTrue: showToast, setFalse: hideToast }] = useBooleanState(false)
  const { updateUser } = useUserContext()
  const { mutate: createTempUser } = useCreateTempUser()

  useEffect(() => {
    if (isFirstVisit) isFirstVisit = false
    else showToast()
  }, [showToast])

  const onSubmit = async () => {
    await setItem('firstName', nameInput)
    createTempUser(
      { firstName: nameInput },
      {
        onSuccess: (data) => {
          updateUser(data.user)
        },
      }
    )
  }

  return (
    <SafeAreaWrapper>
      <Box>
        {isToastVisible && <Toast variant="success" text={t('logoutSuccess')} onHide={hideToast} />}
      </Box>
      <KeyboardAwareScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <WelcomeTopBar openModal={openModal} />
        <Box justifyContent="center" marginTop="m">
          <Text variant="title1">{t('welcomeTitle')}</Text>
        </Box>
        <Box justifyContent="center" marginTop="m">
          <Text variant="body1">{t('welcomeSubtitle')}</Text>
        </Box>
        <Box marginTop="xl">
          <FormInput
            variant="medium"
            maxLength={20}
            control={control}
            isError={!!errors.firstName}
            errors={errors}
            name="firstName"
            inputLabel={t('yourName')}
            validationPattern={onlyLettersRegex}
            errorMessage={t('firstNameErrMsg', { max: MAX_SIGNS })}
            blurOnSubmit
            placeholder={t('placeholder')}
            reset={reset}
          />
        </Box>
        <Box>
          <Text variant="lightGreyRegular" paddingHorizontal="s">
            {t('whyAskForName')}
          </Text>
        </Box>
      </KeyboardAwareScrollView>
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="dashboardBackground"
        paddingBottom="l"
        alignItems="center">
        <Box paddingBottom={isIos ? 'l' : 's'}>
          <CustomButton
            variant="primary"
            label={t('seeDemoButton')}
            onPress={handleSubmit(onSubmit)}
            disabled={!(nameInput?.length >= MIN_SIGNS && nameInput?.length <= MAX_SIGNS)}
          />
        </Box>
      </Box>
      <BottomSheetModalProvider>
        <BottomSheetModalComponent snapPoints={['90%']} modalRef={modalRef}>
          <About isFromWelcomeScreen closeModal={closeModal} />
        </BottomSheetModalComponent>
      </BottomSheetModalProvider>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  formContainer: {
    marginHorizontal: theme.spacing.l,
  },
}))
