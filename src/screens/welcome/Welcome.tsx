import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'
import { minOneWordRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { WelcomeTopBar } from './components/WelcomeTopBar'

export const Welcome = () => {
  const styles = useStyles()
  const { t } = useTranslation('welcome')
  const { control, handleSubmit, errors, watch } = useForm()
  const nameInput = watch('firstName')
  const { navigate } = useNavigation()
  const { updateUser } = useUserContext()

  const onSubmit = (data: { firstName: string }) => {
    updateUser({ firstName: data.firstName })
    navigate('TeamsModal')
  }

  return (
    <SafeAreaWrapper>
      <KeyboardAwareScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <WelcomeTopBar />
        <Box justifyContent="center" marginTop="m">
          <Text variant="title1">{t('welcomeTitle')}</Text>
        </Box>
        <Box justifyContent="center" marginTop="s">
          <Text variant="body1Bold">{t('welcomeSubtitle')}</Text>
        </Box>
        <Box marginTop="xl">
          <FormInput
            control={control}
            isError={!!errors.firstName}
            errors={errors}
            name="firstName"
            inputLabel={t('yourName')}
            validationPattern={minOneWordRegex}
            errorMessage={t('firstNameErrMsg')}
            blurOnSubmit={false}
          />
        </Box>
        <Box paddingLeft="m">
          <Text variant="lightGreyRegular">{t('whyAskForName')}</Text>
        </Box>
      </KeyboardAwareScrollView>
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="white"
        paddingBottom="l"
        alignItems="center">
        <Box maxWidth={250}>
          <CustomButton
            variant="primary"
            label={t('seeDemoButton')}
            onPress={handleSubmit(onSubmit)}
            // loading={isLoading}
            disabled={!(nameInput?.length > 1)}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  formContainer: {
    marginHorizontal: theme.spacing.l,
  },
}))
