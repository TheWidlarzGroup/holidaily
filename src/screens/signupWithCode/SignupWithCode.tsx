// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { TextInput } from 'react-native'
// import { useForm } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import { useFocusEffect } from '@react-navigation/native'
// import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
// import { Box, mkUseStyles, Text, theme, Theme } from 'utils/theme/index'
// import { shadow } from 'utils/theme/shadows'
// import { passwordRegex, minOneWordRegex } from 'utils/regex'
// import { FormInput } from 'components/FormInput'
// import { CustomButton } from 'components/CustomButton'
// import { createAlert } from 'utils/createAlert'
// import { useBooleanState } from 'hooks/useBooleanState'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { useSignupWithCode } from 'hooks/legacy-api-hooks/useSignupWithCode'
// import { useInvitationCodeData } from 'hooks/legacy-api-hooks/useInvitationCodeData'
// import { StackScreenProps } from '@react-navigation/stack'
// import { AuthRoutes } from 'navigation/types'
// import { useBackgroundEffect } from 'hooks/useBackgroundEffect'
// import { PendingAccountConfirmationModal } from '../signupEmail/components/PendingAccountConfirmationModal'

// const BOTTOM_TAB_HEIGHT = 146

// type SignupWithCodeTypes = StackScreenProps<AuthRoutes, 'SignupWithCode'>

// export const SignupWithCode = ({ route }: SignupWithCodeTypes) => {
//   const { handleSignup, isLoading, signupErrorMessage, isSuccess } = useSignupWithCode()
//   const [isModalVisible, { setFalse: hideModal, setTrue: showModal }] = useBooleanState(false)
//   const [bottomTabHeight, setBottomTabHeight] = useState(BOTTOM_TAB_HEIGHT)
//   const { control, handleSubmit, errors, setValue } = useForm()
//   const { t } = useTranslation('signupEmail')
//   const { data, setCode } = useInvitationCodeData()
//   const inputsRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]
//   useBackgroundEffect(hideModal)

//   const styles = useStyles()

//   const onSubmitEditing = (index: number) => {
//     inputsRefs[index]?.current?.focus()
//   }

//   useEffect(() => {
//     if (route.params?.code) {
//       setCode(route.params.code)
//     }
//   }, [route.params, setCode])

//   useEffect(() => {
//     setValue('code', data.code)
//   }, [setValue, data])

//   useEffect(() => {
//     if (signupErrorMessage) createAlert('Signup Error', signupErrorMessage)
//   }, [signupErrorMessage])

//   useEffect(() => {
//     if (isSuccess) showModal()
//   }, [isSuccess, showModal])

//   useFocusEffect(useCallback(() => hideModal(), [hideModal]))

//   return (
//     <SafeAreaWrapper>
//       <KeyboardAwareScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
//         <Box justifyContent="center" marginTop="xxxl" marginBottom="xxl">
//           <Text variant="title1">{t('signupWithCodeTitle')}</Text>
//           <Text variant="bold16" textAlign="center" marginTop="xm">
//             {data.email}
//           </Text>
//           <Text variant="body1" textAlign="center" marginTop="l">
//             {t('signupWithCodeSubheader')}
//             {data.organizationName}!
//           </Text>
//         </Box>
//         <Box style={{ display: 'none' }}>
//           <FormInput
//             control={control}
//             isError={!!errors.code}
//             errors={errors}
//             name="code"
//             inputLabel={'Code'}
//             validationPattern={minOneWordRegex}
//             errorMessage={t('nameSurnameErrMsg')}
//             blurOnSubmit={false}
//             disabled
//           />
//         </Box>
//         <Box>
//           <FormInput
//             control={control}
//             isError={!!errors.firstName}
//             errors={errors}
//             name="firstName"
//             inputLabel={t('name')}
//             validationPattern={minOneWordRegex}
//             errorMessage={t('nameSurnameErrMsg')}
//             onSubmitEditing={() => onSubmitEditing(0)}
//             blurOnSubmit={false}
//           />
//         </Box>
//         <Box>
//           <FormInput
//             control={control}
//             isError={!!errors.lastName}
//             errors={errors}
//             name="lastName"
//             inputLabel={t('surname')}
//             validationPattern={minOneWordRegex}
//             errorMessage={t('nameSurnameErrMsg')}
//             onSubmitEditing={() => onSubmitEditing(1)}
//             blurOnSubmit={false}
//             ref={inputsRefs[0]}
//           />
//         </Box>
//         <Box>
//           <FormInput
//             control={control}
//             isError={!!errors.occupation}
//             errors={errors}
//             name="occupation"
//             inputLabel={t('occupation')}
//             validationPattern={minOneWordRegex}
//             errorMessage={t('nameSurnameErrMsg')}
//             onSubmitEditing={() => onSubmitEditing(2)}
//             blurOnSubmit={false}
//             ref={inputsRefs[1]}
//           />
//         </Box>
//         <Box>
//           <FormInput
//             control={control}
//             isError={!!errors.password}
//             errors={errors}
//             name="password"
//             inputLabel={t('password')}
//             validationPattern={passwordRegex}
//             errorMessage={t('nameSurnameErrMsg')}
//             ref={inputsRefs[2]}
//             signupPasswordHint={t('passwordHint')}
//             isPasswordIconVisible
//           />
//         </Box>
//         <Text variant="lightGreyRegular" textAlign="center" marginTop="l">
//           {t('privacyPolicyNormal')}
//           <Text variant="primaryBold12">{t('privacyPolicyAccent')}</Text>
//         </Text>
//         <Box height={bottomTabHeight + theme.spacing.l} />
//       </KeyboardAwareScrollView>
//       <Box
//         position="absolute"
//         right={0}
//         left={0}
//         bottom={0}
//         backgroundColor="white"
//         paddingBottom="l"
//         alignItems="center"
//         style={shadow.xs}
//         onLayout={({ nativeEvent }) => {
//           setBottomTabHeight(nativeEvent.layout.height)
//         }}>
//         <Box marginHorizontal="xxl" marginTop="m">
//           <CustomButton
//             variant="primary"
//             label={t('signUpBtn')}
//             onPress={handleSubmit(handleSignup)}
//             loading={isLoading}
//           />
//         </Box>
//       </Box>
//       <PendingAccountConfirmationModal isVisible={isModalVisible} hideModal={hideModal} />
//     </SafeAreaWrapper>
//   )
// }

// const useStyles = mkUseStyles((theme: Theme) => ({
//   formContainer: {
//     marginHorizontal: theme.spacing.l,
//   },
// }))
