import React, { useEffect } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { useForm } from 'react-hook-form'
import { Box, Text, theme, mkUseStyles, Theme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { passwordRegex } from 'utils/regex'
import IconBack from 'assets/icons/icon-back.svg'

export const ChangePassword = () => {
  const { errors, control } = useForm()
  const styles = useStyles()
  const { goBack } = useNavigation()
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
          <TouchableOpacity activeOpacity={0.2} onPress={goBack} style={styles.backBtn}>
            <IconBack />
          </TouchableOpacity>
          <Text variant="boldBlackCenter20" marginBottom="xxxxl">
            {'Password change'}
          </Text>
          <FormInput
            control={control}
            errors={errors}
            name={'currPassword'}
            inputLabel={'Your current password'}
            validationPattern={passwordRegex}
            errorMessage={'Something went wrong.'}
            isPasswordIconVisible
            isError={!!errors.password}
          />
          <RectButton
            rippleColor={theme.colors.rippleColor}
            activeOpacity={0.2}
            onPress={() => console.log('take user to forgot password flow')}
            style={styles.forgottenPasswordBtn}>
            <Text variant="labelGrey">{'Forgot your password?'}</Text>
          </RectButton>
          <FormInput
            control={control}
            errors={errors}
            name={'newPassword'}
            inputLabel={'New password'}
            validationPattern={passwordRegex}
            errorMessage={'Something went wrong.'}
            isPasswordIconVisible
            isError={!!errors.newPassword}
          />
          <FormInput
            control={control}
            errors={errors}
            name={'confNewPassword'}
            inputLabel={'Repeat new password'}
            validationPattern={passwordRegex}
            errorMessage={'Something went wrong.'}
            isPasswordIconVisible
            isError={!!errors.confNewPassword}
          />
          <Box position="absolute" bottom={16} alignSelf="center">
            <CustomButton
              label={'Save'}
              variant="primary"
              onPress={() => console.log('save new password')}
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
