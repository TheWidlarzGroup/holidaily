import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, useTheme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Controller } from 'react-hook-form'
import { UserProfileType } from 'navigation/types'
import { useTeamMocks } from 'utils/mocks/teamsMocks'
import { useEditUser } from 'dataAccess/mutations/useEditUser'
import { Analytics } from 'services/analytics'
import {
  ProfileColorProps,
  ProfileColorViewProps,
  UncontrolledColorPickerProps,
} from 'types/ColorPickerTypes'
import { ProfileColorExpandableArea } from './ProfileColorExpandableArea'

export const ProfileColor = (p: ProfileColorProps) => {
  const isControlled = 'control' in p
  return isControlled ? (
    <Controller
      control={p.control}
      name={p.name}
      render={({ onChange, value }) => (
        <ProfileColorView animationStatus={p.animationStatus} onChange={onChange} value={value} />
      )}
    />
  ) : (
    <UncontrolledProfileColor {...p} />
  )
}

const ProfileColorView = (p: ProfileColorViewProps) => {
  const { user } = useUserContext()
  const { isLoading } = useTeamMocks()
  const isTouchDisabled = isLoading || !user
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation<UserProfileType<'COLOR_PICKER'>>()

  const animationEndsAction = () => {
    if (isTouchDisabled) return
    navigation.navigate('COLOR_PICKER', {
      onChange: (value) => {
        p.onChange(value)
        Analytics().track('USER_COLOR_PICKED', { color: value })
      },
      value: p.value,
    })
  }

  return (
    <Box
      height={75}
      pointerEvents={isTouchDisabled ? 'none' : undefined}
      opacity={isTouchDisabled ? 0.4 : 1}
      paddingLeft="xs"
      paddingRight="m"
      marginBottom="xxxl"
      marginTop="s">
      <Text variant="sectionLabel" marginLeft="m" marginBottom="m">
        {t('userColor')}
      </Text>
      <ProfileColorExpandableArea
        callback={animationEndsAction}
        animationStatus={p.animationStatus}
        currentColor={p.value || user?.userColor}
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
      animationStatus={p.animationStatus}
    />
  )
}
