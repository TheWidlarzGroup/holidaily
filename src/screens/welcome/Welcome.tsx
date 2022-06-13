import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'
import { onlyLettersRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setItem } from 'utils/localStorage'
import { isIos } from 'utils/layout'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { createNotifications } from 'react-native-notificated'
import { useBooleanState } from 'hooks/useBooleanState'
import { AuthNavigationProps } from 'navigation/types'
import { Analytics } from 'services/analytics'
import { WelcomeTopBar } from './components/WelcomeTopBar'
import { AboutModal } from './components/AboutModal'

const MIN_SIGNS = 2
const MAX_SIGNS = 20

export const Welcome = ({ route }: AuthNavigationProps<'WELCOME'>) => {
  const { useNotifications } = createNotifications()
  const { notify } = useNotifications()
  const styles = useStyles()
  const { t } = useTranslation('welcome')
  const { control, handleSubmit, errors, watch } = useForm()
  const nameInput = watch('firstName')
  const [isModalVisible, { setTrue: openModal, setFalse: hideModal }] = useBooleanState(false)
  const [hasUserLoggedOut, setHasUserLoggedOut] = useState(false)
  const { updateUser } = useUserContext()
  const { mutate: createTempUser } = useCreateTempUser()

  useEffect(() => {
    if (route.params?.userLoggedOut) {
      notify('success', { params: { title: t('logoutSuccess') } })
      setHasUserLoggedOut(true)
    }
  }, [route.params?.userLoggedOut, notify, t])

  const onSubmit = async () => {
    await setItem('firstName', nameInput)
    Analytics().identify({ firstName: nameInput })
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
      <KeyboardAwareScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <WelcomeTopBar openModal={openModal} hasUserLoggedOut={hasUserLoggedOut} />
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
        backgroundColor="dashboardBackgroundBrighter"
        paddingBottom="l"
        alignItems="center">
        <Box paddingBottom={isIos ? 'xl' : 's'} backgroundColor="dashboardBackgroundBrighter">
          <CustomButton
            variant="primary"
            label={t('seeDemoButton')}
            onPress={handleSubmit(onSubmit)}
            disabled={!(nameInput?.length >= MIN_SIGNS && nameInput?.length <= MAX_SIGNS)}
          />
        </Box>
      </Box>
      <AboutModal isOpen={isModalVisible} onHide={hideModal} />
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  formContainer: {
    marginHorizontal: theme.spacing.l,
  },
}))
