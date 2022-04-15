import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, mkUseStyles, Theme, theme, BaseOpacity } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { UserProfileType } from 'navigation/types'

type ProfileColorProps = {
  control: Control<FieldValues>
  setIsEdited: F0
  name: string
}

export const ProfileColor = ({ control, name, setIsEdited }: ProfileColorProps) => {
  const styles = useStyles()
  const { user } = useUserContext()
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation<UserProfileType<'ColorPicker'>>()

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, value }) => (
        <Box paddingHorizontal="m" marginBottom="xl" marginTop="s">
          <Text variant="labelGrey" marginLeft="m">
            {t('userColor')}
          </Text>
          <BaseOpacity
            onPress={() =>
              navigation.navigate('ColorPicker', {
                onChange: (value) => {
                  onChange(value)
                  setIsEdited()
                },
                value,
              })
            }
            style={[
              styles.colorBtn,
              { backgroundColor: value ?? user?.userColor ?? theme.colors.primary },
            ]}
          />
        </Box>
      )}
    />
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
