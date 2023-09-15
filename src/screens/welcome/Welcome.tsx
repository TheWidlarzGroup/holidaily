import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'
import { onlyLettersRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setItem } from 'utils/localStorage'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
import { AuthNavigationProps } from 'navigation/types'
import { Analytics } from 'services/analytics'
import { isIos } from 'utils/layout'
import { PrivacyPolicyContent } from 'screens/about/components/PrivacyPolicyContent'
import { CustomModal } from 'components/CustomModal'
import { WelcomeTopBar } from './components/WelcomeTopBar'
import { AboutModal } from './components/AboutModal'
import { ShowPrivacyPolicyButton } from './components/ShowPrivacyPolicyButton'

const MIN_SIGNS = 2
const MAX_SIGNS = 20

export const Welcome = ({ route }: AuthNavigationProps<'WELCOME'>) => {
  const styles = useStyles()
  const { t } = useTranslation('welcome')
  const { control, handleSubmit, errors, watch } = useForm()
  const nameInput = watch('firstName')
  const [isModalVisible, { setTrue: openModal, setFalse: hideModal }] = useBooleanState(false)
  const { updateUser } = useUserContext()
  const { mutate: createTempUser } = useCreateTempUser()
  const { notify } = useGetNotificationsConfig()
  const [isLoading, { setFalse: hideLoader, setTrue: showLoader }] = useBooleanState(false)
  const [
    isPrivacyPolicyModalVisible,
    { setFalse: hidePrivacyPolicyModal, setTrue: showPrivacyPolicyModal },
  ] = useBooleanState(false)

  useEffect(() => {
    if (route.params?.userLoggedOut) {
      notify('successCustom', { params: { title: t('logoutSuccess') } })
    }
  }, [route.params?.userLoggedOut, notify, t])

  const onSubmit = async () => {
    showLoader()
    await setItem('firstName', nameInput)
    Analytics().identify({ firstName: nameInput })
    createTempUser(
      { firstName: nameInput },
      {
        onSuccess: (data) => {
          hideLoader()
          updateUser(data.user)
        },
      }
    )
  }

  return (
    <SafeAreaWrapper>
      <KeyboardAwareScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <WelcomeTopBar openModal={openModal} />
        <Text variant="title1" marginTop="m" textAlign="center">
          {t('welcomeTitle')}
        </Text>
        <Text variant="body1" marginTop="m" textAlign="center" marginBottom="xl">
          {t('welcomeSubtitle')}
        </Text>
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
        />
        <Text variant="lightGreyRegular" paddingHorizontal="s">
          {t('whyAskForName')}
        </Text>
      </KeyboardAwareScrollView>
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="dashboardBackgroundBrighter"
        paddingBottom={isIos ? 'ml' : 'xs'}
        marginBottom="l"
        alignItems="center">
        <ShowPrivacyPolicyButton onPress={showPrivacyPolicyModal} />

        <CustomButton
          loading={isLoading}
          variant="primary"
          label={t('seeDemoButton')}
          onPress={handleSubmit(onSubmit)}
          disabled={!(nameInput?.length >= MIN_SIGNS && nameInput?.length <= MAX_SIGNS)}
        />
      </Box>
      <AboutModal isOpen={isModalVisible} onHide={hideModal} />
      <CustomModal
        style={{
          marginTop: isIos ? 30 : 0,
        }}
        backdropColor={styles.privacyPolicyModalBackdrop.backgroundColor}
        backdropOpacity={1}
        isVisible={isPrivacyPolicyModalVisible}
        onBackdropPress={hidePrivacyPolicyModal}
        onBackButtonPress={hidePrivacyPolicyModal}>
        <PrivacyPolicyContent />
      </CustomModal>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  formContainer: {
    marginHorizontal: theme.spacing.l,
  },
  privacyPolicyModalBackdrop: {
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
