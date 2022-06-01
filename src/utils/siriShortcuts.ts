import { ShortcutOptions } from 'react-native-siri-shortcut'

export const sickday: ShortcutOptions = {
  activityType: 'com.holidaily.AddRequest',
  title: 'Take a sick day',
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Take a sick day',
  userInfo: {
    action: 'sickday',
  },
  needsSave: true,
}
