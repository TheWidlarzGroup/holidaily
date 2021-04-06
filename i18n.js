import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  pl: {
    slider: {
      'Welcome to React': 'Witaj w react i react-i18next',
      'Welcome to Holidaily!': 'Witaj w Holidaily!',
      'All your team days-off in one place.': 'Wszystkie urlopy twojego zespołu w jednym miejscu.',
      'Real-time vacation checking': 'Sprawdzanie wakacji w czasie rzeczywistym',
      'Check how many leaves have left.': 'Sprawdź jak dużo xxx zostało.',
      'Request time off': 'Poproś o czas wolny',
      'Are you planning vacations or some personal time? Simply request it.':
        'Planujesz wakacje lub czas dla siebie ? Po prostu o nie poproś.',
      'Get notified': 'Otrzymuj powiadomienia',
      'You’ll get notifications once the vacation is approved or rejected.':
        'Dostaniesz powiadomienie kiedy wniosek zostanie zaakceptowany lub odrzucony',
      Next: 'Dalej',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl',
  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
})
