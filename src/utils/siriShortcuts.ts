import { ShortcutOptions } from 'react-native-siri-shortcut'

export const sickday: ShortcutOptions = {
  activityType: 'com.holidaily.AddRequest',
  title: 'Take sickday',
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Take sickday',
  userInfo: {
    action: 'sickday',
  },
  needsSave: true,
}
