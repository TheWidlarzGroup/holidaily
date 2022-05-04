import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme/index'
import { minMaxSignsRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BottomSheetModalComponent } from 'components/BottomSheetModalComponent'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { About } from 'screens/about/About'
import { WelcomeTopBar } from './components/WelcomeTopBar'
import { TeamsModal } from './components/TeamsModal'

const MIN_SIGNS = 1
const MAX_SIGNS = 20
const validationPattern = minMaxSignsRegex(MIN_SIGNS, MAX_SIGNS)

export const Welcome = () => {
  const styles = useStyles()
  const { t } = useTranslation('welcome')
  const { control, handleSubmit, errors, watch, reset } = useForm()
  const nameInput = watch('firstName')

  const modalRef = useRef<BottomSheetModal>(null)
  const openModal = useCallback(() => modalRef.current?.present(), [])
  const closeModal = useCallback(() => modalRef.current?.dismiss(), [])

  const submitModalRef = useRef<BottomSheetModal>(null)
  const openSubmitModal = useCallback(() => submitModalRef.current?.present(), [])

  const onSubmit = () => {
    openSubmitModal()
  }

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <KeyboardAwareScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <WelcomeTopBar openModal={openModal} />
        <Box justifyContent="center" marginTop="m">
          <Text variant="title1">{t('welcomeTitle')}</Text>
        </Box>
        <Box justifyContent="center" marginTop="m">
          <Text variant="body1">{t('welcomeSubtitle')}</Text>
        </Box>
        <Box marginTop="xl">
          <FormInput
            labelTextVariant="lightGreyRegular"
            maxLength={15}
            control={control}
            isError={!!errors.firstName}
            errors={errors}
            name="firstName"
            inputLabel={t('yourName')}
            validationPattern={validationPattern}
            errorMessage={t('firstNameErrMsg', { max: MAX_SIGNS })}
            blurOnSubmit
            placeholder={t('placeholder')}
            deleteIcon
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
        backgroundColor="white"
        paddingBottom="l"
        alignItems="center">
        <Box maxWidth={250}>
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
        <BottomSheetModalComponent snapPoints={['90%']} modalRef={submitModalRef}>
          <TeamsModal firstName={nameInput} />
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
