import { InfoModal } from 'components/notifications/InfoModal'
import { SuccessModal } from 'components/notifications/SuccessModal'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { createNotifications, generateAnimationConfig } from 'react-native-notificated'
import { Easing, interpolate, SharedValue } from 'react-native-reanimated'
import { isAndroid } from 'utils/layout'
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

      const androidTranslateY = isAndroid ? -20 : -10
      const translateY = interpolate(progress.value, [0, 1], [-100, androidTranslateY])

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
          animationConfig: notificationAnimation,
        },
      },
      infoCustom: {
        component: InfoModal,
        config: {
          animationConfig: notificationAnimation,
        },
      },
    },
    duration: 2300,
    animationConfig: notificationAnimation,
    isNotch: true,
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
