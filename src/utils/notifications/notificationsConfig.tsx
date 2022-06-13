import { InfoModal } from 'components/notifications/InfoModal'
import { SuccessModal } from 'components/notifications/SuccessModal'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { createNotifications, generateAnimationConfig } from 'react-native-notificated'
import { Easing, interpolate, SharedValue } from 'react-native-reanimated'
import { theme } from 'utils/theme'

const successIcon = require('assets/icons/success-icon.png')

export const useGetNotificationsConfig = () => {
  const { userSettings } = useUserSettingsContext()
  const isDarkMode = userSettings?.darkMode
  const notificationAnimation = generateAnimationConfig({
    animationConfigIn: {
      type: 'timing',
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.sin),
      },
    },
    transitionInStyles: (progress: SharedValue<number>) => {
      'worklet'

      const translateY = interpolate(progress.value, [0, 1], [-100, 30])

      return {
        opacity: progress.value,
        transform: [{ translateY }],
      }
    },
  })

  const { NotificationsProvider, useNotifications } = createNotifications({
    variants: {
      successCustom: {
        component: SuccessModal,
        config: {
          notificationPosition: 'top',
          duration: 2300,
        },
      },
      infoCustom: {
        component: InfoModal,
        config: {
          notificationPosition: 'top',
          duration: 2300,
        },
      },
    },
    duration: 2300,
    animationConfig: notificationAnimation,
    defaultStylesSettings: {
      successConfig: {
        titleSize: 14,
        bgColor: isDarkMode ? theme.colors.black : theme.colors.successToastBg,
        titleColor: isDarkMode ? theme.colors.white : theme.colors.black,
        borderRadius: theme.borderRadii.l1min,
        leftIconSource: successIcon,
      },
    },
  })

  const { notify } = useNotifications()

  return { NotificationsProvider, notificationAnimation, useNotifications, notify }
}
