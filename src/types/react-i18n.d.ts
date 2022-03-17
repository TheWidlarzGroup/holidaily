import 'react-i18next'

import { Languages } from '../../i18n'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'default'
    resources: Languages['en']
  }
}
