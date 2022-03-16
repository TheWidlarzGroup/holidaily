import 'react-i18next'

import { LANGUAGES } from '../../i18n'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'default'
    resources: LANGUAGES['en']
  }
}
