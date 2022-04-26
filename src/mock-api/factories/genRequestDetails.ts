import faker from '@faker-js/faker'

const descriptions = {
  places: [
    'Portugal',
    'Italy',
    'Spain',
    'Greece',
    'France',
    'Croatia',
    'Malta',
    'Cyprus',
    'Rome',
    'Sicily',
    'Sardegna',
    'Corsica',
    'Mallorca',
    'New York',
    'London',
    'Edinburgh',
    'Crete',
    'Barcelona',
  ],
  misc: [
    'Time off',
    'Time off',
    'Time off',
    'Time off',
    'Time off',
    'Time off',
    'RHCP concert',
    'Freeride Kaunertal',
    'Hiking the Tatras',
  ],
}

const messages = {
  places: [
    "I've always dreamed of visiting ",
    "I'm taking my wife and kids to ",
    "I'll send you a poster from ",
    'Vacation in ',
    'I need to rest in ',
    'I must taste the cuisine of ',
    'Long time have I missed the ',
    'Visiting my family in ',
  ],
}

export const genRequestDetails = () => {
  const { places, misc } = descriptions
  const descsTotal = places.length + misc.length
  const placesChance = places.length / descsTotal
  const random = Math.random()
  let description = ''
  let message = ''
  if (random - placesChance <= 0) {
    description = places[faker.datatype.number(places.length - 1)]
    message = messages.places[faker.datatype.number(messages.places.length - 1)] + description
  } else {
    description = misc[faker.datatype.number(misc.length - 1)]
  }
  return { description, message }
}
