import { Linking } from 'react-native'

export const linkWithFallback = async (link: string, fallback: string) => {
  if (await Linking.canOpenURL(link)) await Linking.openURL(link)
  else if (await Linking.canOpenURL(fallback)) await Linking.openURL(fallback)
  else await Linking.openURL(COMPANY_WEBSITE_LINK)
}

const COMPANY_WEBSITE_LINK = 'https://thewidlarzgroup.com'
