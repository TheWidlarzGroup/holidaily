import { SuccessModal } from 'components/notifications/SuccessModal'
import { createNotifications, generateAnimationConfig } from 'react-native-notificated'
import { Easing, interpolate, SharedValue } from 'react-native-reanimated'
import { theme } from 'utils/theme'

type ConfigType = {
  isDarkMode?: boolean
}

export const getNotificationsConfig = ({ isDarkMode }: ConfigType) => {
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

  const { NotificationsProvider } = createNotifications({
    variants: {
      successCustom: {
        component: SuccessModal,
        config: {
          notificationPosition: 'top',
          duration: 1200,
        },
      },
    },
    duration: 1200,
    animationConfig: notificationAnimation,
    defaultStylesSettings: {
      successConfig: {
        titleSize: 14,
        bgColor: isDarkMode ? theme.colors.black : theme.colors.successToastBg,
        titleColor: isDarkMode ? theme.colors.white : theme.colors.black,
        borderRadius: theme.borderRadii.l1min,
        leftIconSource: require('assets/icons/success-icon.png'),
      },
    },
  })

  return { NotificationsProvider, notificationAnimation }
}
