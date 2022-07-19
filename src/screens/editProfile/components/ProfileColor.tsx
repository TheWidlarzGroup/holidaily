import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, useTheme } from 'utils/theme'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { useTeamMocks } from 'utils/mocks/teamsMocks'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { Analytics } from 'services/analytics'
import { useBooleanState } from 'hooks/useBooleanState'
import { ProfileColorExpandableArea } from './ProfileColorExpandableArea'
import { BubbleContainer } from './bubblePicker/BubbleContainer'

type AnimationStatusProps = {
  animationIsTriggered: F0
  animationNotTriggered: F0
}

type ControlledColorPickerProps = {
  control: Control<FieldValues>
  name: string
  animationStatus: AnimationStatusProps
}

type UncontrolledColorPickerProps = {
  animationStatus: AnimationStatusProps
  onUpdate?: F1<EditUserSuccess>
}

type ProfileColorProps = ControlledColorPickerProps | UncontrolledColorPickerProps

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

type ProfileColorViewProps = {
  onChange: F1<string>
  value: string
  animationStatus: AnimationStatusProps
}

const ProfileColorView = (p: ProfileColorViewProps) => {
  const [displayBubbleContainer, { setTrue: showBubbleContainer, setFalse: hideBubbleContainer }] =
    useBooleanState(false)
  const { user } = useUserContext()
  const { isLoading } = useTeamMocks()
  const isTouchDisabled = isLoading || !user
  const { t } = useTranslation('userProfile')

  const animationEndsAction = () => {
    if (isTouchDisabled) return
    showBubbleContainer()
  }

  const onChange = (value: string) => {
    p.onChange(value)
    Analytics().track('USER_COLOR_PICKED', { color: value })
  }

  return (
    <>
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
      <BubbleContainer
        isOpen={displayBubbleContainer}
        handleClose={hideBubbleContainer}
        onChange={() => onChange(p.value)}
        value={p.value}
      />
    </>
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
