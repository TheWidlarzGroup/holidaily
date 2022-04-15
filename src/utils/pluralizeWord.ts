import { getCurrentLocale } from './locale'

type HandledKeys = 'comments'

export const pluralizeWord = (key: HandledKeys, quantity: number) => {
  const locale = getCurrentLocale()
  switch (locale.code) {
    case 'pl':
      return pluralizeInPolish(key, quantity)
    case 'en':
    default:
      return pluralizeInEnglish(key, quantity)
  }
}

const pluralizeInEnglish = (key: HandledKeys, quantity: number) => {
  if (quantity === 1) return `${quantity} ${translations.en[key].one}`
  return `${quantity} ${translations.en[key].many}`
}

const pluralizeInPolish = (key: HandledKeys, quantity: number) => {
  const lastNum = String(quantity).split('')[0]
  switch (lastNum) {
    case '0':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return `${quantity} ${translations.pl[key].many}`
    case '1':
      return `${quantity} ${translations.pl[key].one}`
    default:
      return `${quantity} ${translations.pl[key].few}`
  }
}

const translations = {
  pl: {
    comments: {
      one: 'komentarz',
      few: 'komentarze',
      many: 'komentarzy',
    },
  },
  en: {
    comments: {
      one: 'comment',
      many: 'comments',
    },
  },
}
