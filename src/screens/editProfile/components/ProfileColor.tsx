import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text, mkUseStyles, useTheme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { UserProfileType } from 'navigation/types'
import { useTeamMocks } from 'utils/mocks/teamsMocks'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { Analytics } from 'services/analytics'
import SwipeUpIcon from 'assets/icons/icon-swipe-up.svg'

import { windowHeight, windowWidth } from 'utils/deviceSizes'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

type ControlledColorPickerProps = {
  control: Control<FieldValues>
  name: string
}

type UncontrolledColorPickerProps = { onUpdate?: F1<EditUserSuccess> }

type ProfileColorProps = ControlledColorPickerProps | UncontrolledColorPickerProps

export const ProfileColor = (p: ProfileColorProps) => {
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

type ProfileColorViewProps = {
  onChange: F1<string>
  value: string
}

const ProfileColorView = (p: ProfileColorViewProps) => {
  const styles = useStyles()
  const { user } = useUserContext()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const navigation = useNavigation<UserProfileType<'COLOR_PICKER'>>()
  const { isLoading } = useTeamMocks()
  const isTouchDisabled = isLoading || !user

  const startingPosition = 0
  const translateY = useSharedValue(startingPosition)
  const ExpandableArea = Animated.createAnimatedComponent(Box)
  const expandableAreaStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: translateY.value }],
    }),
    []
  )

  useLayoutEffect(() => {
    if (translateY.value !== startingPosition) translateY.value = startingPosition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPress = () => {
    if (isTouchDisabled) return
    navigation.navigate('COLOR_PICKER', {
      onChange: (value) => {
        p.onChange(value)
        Analytics().track('USER_COLOR_PICKED', { color: value })
      },
      value: p.value,
    })
  }
  console.log(onPress) // to delete - development purpose

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startY: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.startY = startingPosition
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY
    },
    onEnd: (event) => {
      if (event.translationY < -200) {
        translateY.value = withSpring(-windowHeight * 1.2)
      } else {
        translateY.value = withSpring(startingPosition)
      }
    },
  })

  return (
    <Box
      height={103}
      pointerEvents={isTouchDisabled ? 'none' : undefined}
      opacity={isTouchDisabled ? 0.4 : 1}
      paddingLeft="xs"
      paddingRight="m"
      marginBottom="xxxl"
      marginTop="s">
      <Text variant="sectionLabel" marginLeft="m" marginBottom="m">
        {t('userColor')}
      </Text>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <ExpandableArea
          style={[
            styles.componentArea,
            expandableAreaStyle,
            {
              backgroundColor: p.value || user?.userColor || theme.colors.primary,
            },
          ]}>
          <SwipeUpIcon
            width={12}
            height={12}
            style={styles.swipeUpIcon}
            color={theme.colors.alwaysWhite}
          />
          <Text style={styles.changeColor} variant="textBoldSM" lineHeight={21} color="alwaysWhite">
            Change color
          </Text>
        </ExpandableArea>
      </PanGestureHandler>
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

const useStyles = mkUseStyles(() => ({
  componentArea: {
    height: windowHeight * 2,
    width: windowWidth * 1.2,
    left: -windowWidth * 0.1,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    alignItems: 'center',
  },
  swipeUpIcon: {
    top: 17,
  },
  changeColor: {
    position: 'relative',
    top: 42,
  },
}))
