import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, mkUseStyles, Theme, theme, BaseOpacity } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useUserDetailsContext } from '../helpers/UserDetailsContext'

export const ProfileColor = () => {
  const styles = useStyles()
  const { userColor } = useUserDetailsContext()
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation()

  const onChangeUserColor = () => navigation.navigate('ColorPicker')

  return (
    <Box paddingHorizontal="m" marginBottom="xl" marginTop="s">
      <Text variant="label1" marginLeft="m">
        {t('userColor')}
      </Text>
      <BaseOpacity
        onPress={onChangeUserColor}
        style={[
          styles.colorBtn,
          { backgroundColor: userColor !== '' ? userColor : theme.colors.primary },
        ]}
      />
    </Box>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  colorBtn: {
    marginTop: theme.spacing.xm,
    marginLeft: theme.spacing.m,
    height: 44,
    width: 44,
    borderRadius: theme.borderRadii.full,
  },
}))
