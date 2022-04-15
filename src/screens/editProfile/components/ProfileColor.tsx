import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, mkUseStyles, Theme, theme, BaseOpacity } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { UserProfileType } from 'navigation/types'

type ProfileColorProps = {
  setIsEdited: F0
  onChange: F1<string>
  value: string
}

type PorifileColorControllerProps = {
  control: Control<FieldValues>
  name: string
  setIsEdited: F0
}

const ProfileColor = (p: ProfileColorProps) => {
  const styles = useStyles()
  const { user } = useUserContext()
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation<UserProfileType<'ColorPicker'>>()

  return (
    <Box paddingHorizontal="m" marginBottom="xl" marginTop="s">
      <Text variant="labelGrey" marginLeft="m">
        {t('userColor')}
      </Text>
      <BaseOpacity
        onPress={() =>
          navigation.navigate('ColorPicker', {
            onChange: (value) => {
              p.onChange(value)
              p.setIsEdited()
            },
            value: p.value,
          })
        }
        style={[
          styles.colorBtn,
          { backgroundColor: p.value || user?.userColor || theme.colors.primary },
        ]}
      />
    </Box>
  )
}

const ControlledProfileColor = (p: PorifileColorControllerProps) => (
  <Controller
    control={p.control}
    name={p.name}
    render={({ onChange, value }) => (
      <ProfileColor onChange={onChange} value={value} setIsEdited={p.setIsEdited} />
    )}
  />
)

const useStyles = mkUseStyles((theme: Theme) => ({
  colorBtn: {
    marginTop: theme.spacing.xm,
    marginLeft: theme.spacing.m,
    height: 44,
    width: 44,
    borderRadius: theme.borderRadii.full,
  },
}))

export { ControlledProfileColor as ProfileColor }
