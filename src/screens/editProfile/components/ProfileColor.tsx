import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, mkUseStyles, Theme, BaseOpacity, useTheme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { UserProfileType } from 'navigation/types'
import { useTeamMocks } from 'utils/mocks/teamsMocks'
import { InputEditIcon } from 'components/InputEditIcon'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'

type ProfileColorViewProps = {
  onChange: F1<string>
  value: string
}

type ControlledColorPickerProps = {
  control: Control<FieldValues>
  name: string
}

type UncontrolledColorPickerProps = { onUpdate?: F1<EditUserSuccess> }

type PorifileColorProps = ControlledColorPickerProps | UncontrolledColorPickerProps
const ProfileColorView = (p: ProfileColorViewProps) => {
  const styles = useStyles()
  const { user } = useUserContext()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation<UserProfileType<'COLOR_PICKER'>>()
  const { isLoading } = useTeamMocks()
  const isTouchDisabled = isLoading || !user
  const onPress = () => {
    if (isTouchDisabled) return
    navigation.navigate('COLOR_PICKER', {
      onChange: (value) => {
        p.onChange(value)
      },
      value: p.value,
    })
  }
  return (
    <Box
      pointerEvents={isTouchDisabled ? 'none' : undefined}
      opacity={isTouchDisabled ? 0.4 : 1}
      paddingLeft="xs"
      paddingRight="m"
      marginBottom="xl"
      marginTop="s">
      <Text variant="sectionLabel" marginLeft="m">
        {t('userColor')}
      </Text>
      <Text variant="textXS" color="darkGrey" marginLeft="m">
        {t('userColorDesc')}
      </Text>
      <BaseOpacity
        onPress={onPress}
        style={[
          styles.colorBtn,
          {
            backgroundColor: p.value || user?.userColor || theme.colors.primary,
          },
        ]}
      />
      <InputEditIcon
        bottom={theme.spacing['-xs']}
        top={undefined}
        right={theme.spacing.m}
        onPress={onPress}
      />
    </Box>
  )
}

const UncontrolledProfileColor = (p: UncontrolledColorPickerProps) => {
  const { user } = useUserContext()
  const { mutate } = useEditUser()
  const theme = useTheme()
  return (
    <ProfileColorView
      onChange={(newColor) =>
        mutate({ userColor: newColor }, { onSuccess: (payload) => p.onUpdate?.(payload) })
      }
      value={user?.userColor ?? theme.colors.primary}
    />
  )
}

export const ProfileColor = (p: PorifileColorProps) => {
  const isControlled = 'control' in p
  return isControlled ? (
    <Controller
      control={p.control}
      name={p.name}
      render={({ onChange, value }) => <ProfileColorView onChange={onChange} value={value} />}
    />
  ) : (
    <UncontrolledProfileColor {...p} />
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
