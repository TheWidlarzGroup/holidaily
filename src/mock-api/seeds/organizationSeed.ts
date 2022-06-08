import { Server } from 'miragejs'
import { genRandomDayOffRequest } from 'mockApi/factories/requestFactory'
import { usersList } from 'mockApi/factories/userFactory'
import { Schema } from 'mockApi/models'

// Comment: Mocked requests
const DAY_IN_MS = 24 * 3600 * 1000

const requestTomWaist = {
  id: 'requestTomWaist',
  description: 'A couple days off',
  startDate: new Date(Date.now() + 1 * DAY_IN_MS).toISOString(),
  endDate: new Date(Date.now() + 7 * DAY_IN_MS).toISOString(),
  createdAt: new Date(Date.now()).toISOString(),
  status: 'accepted',
}

const requestPeterKansas = {
  id: 'requestPeterKansas',
  description: 'A couple days off',
  startDate: new Date(Date.now() + 1 * DAY_IN_MS).toISOString(),
  endDate: new Date(Date.now() + 14 * DAY_IN_MS).toISOString(),
  createdAt: new Date(Date.now()).toISOString(),
  status: 'accepted',
}

export const organizationSeed = (context: Server<Schema>) => {
  const users = usersList.map((user, index) => {
    const userRecord = context.create('user', {
      ...user,
    })
    if (index === 0) {
      const mockedRequest = Object.assign(genRandomDayOffRequest(), requestTomWaist)
      context.create('request', { ...mockedRequest, user: userRecord })
    }
    if (index === 1) {
      const mockedRequest = Object.assign(genRandomDayOffRequest(), requestPeterKansas)
      context.create('request', { ...mockedRequest, user: userRecord })
    }
    if (index < 40 && index !== 0 && index !== 1) {
      context.create('request', { ...genRandomDayOffRequest(), user: userRecord })
    }
    return userRecord
  })
  const teams = []
  teams.push(
    context.create('team', {
      name: 'SmartSoft',
      users: [...users.slice(0, 5), ...users.slice(40, 42)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'FileCode',
      users: [...users.slice(4, 10), ...users.slice(42, 44)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'Softlab',
      users: [...users.slice(7, 13), ...users.slice(44, 45)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'Open Byte',
      users: users.slice(11, 16),
    })
  )
  teams.push(
    context.create('team', {
      name: 'Spaceware',
      users: [...users.slice(15, 22), ...users.slice(44, 46)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'Webrain',
      users: [...users.slice(22, 27), ...users.slice(45, 47)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'Pharmic',
      users: [...users.slice(27, 32), ...users.slice(47, 49)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'NMedical',
      users: [...users.slice(30, 37), ...users.slice(49, 50)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'Encrypto',
      users: [...users.slice(36, 40), ...users.slice(42, 44)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'AgileSoft',
      users: users.slice(38, 45),
    })
  )
  teams.push(
    context.create('team', {
      name: 'WWWare',
      users: [...users.slice(22, 26), ...users.slice(45, 50)],
    })
  )
  context.create('organization', {
    name: 'Supercompany',
    maxPtoDays: 21,
    teams,
  })
}
