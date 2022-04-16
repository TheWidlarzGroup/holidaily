import faker from '@faker-js/faker'

export const getRandomValue = (array: string[]) =>
  array[faker.datatype.number({ min: 0, max: array.length - 1 })]
