import { Server } from 'miragejs'
import { genRandomDayOffRequest } from 'mockApi/factories/requestFactory'
import { usersList } from 'mockApi/factories/userFactory'
import { Schema } from 'mockApi/models'

export const organizationSeed = (context: Server<Schema>) => {
  const users = usersList.map((user) => {
    const userRecord = context.create('user', {
      ...user,
    })
    context.create('request', { ...genRandomDayOffRequest(), user: userRecord })
    return userRecord
  })
  const teams = []
  teams.push(
    context.create('team', {
      name: 'SmartSoft',
      users: users.slice(0, 6),
    })
  )
  teams.push(
    context.create('team', {
      name: 'FileCode',
      users: users.slice(4, 10),
    })
  )
  teams.push(
    context.create('team', {
      name: 'Softlab',
      users: users.slice(7, 13),
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
      users: users.slice(15, 22),
    })
  )
  teams.push(
    context.create('team', {
      name: 'Webrain',
      users: users.slice(22, 27),
    })
  )
  teams.push(
    context.create('team', {
      name: 'Pharmic',
      users: users.slice(27, 32),
    })
  )
  teams.push(
    context.create('team', {
      name: 'NMedical',
      users: users.slice(30, 37),
    })
  )
  teams.push(
    context.create('team', {
      name: 'Encrypto',
      users: users.slice(36, 40),
    })
  )
  teams.push(
    context.create('team', {
      name: 'AgileSoft',
      users: [...users.slice(4, 7), ...users.slice(18, 20)],
    })
  )
  teams.push(
    context.create('team', {
      name: 'WWWare',
      users: [...users.slice(11, 13), ...users.slice(24, 32)],
    })
  )
  context.create('organization', {
    name: 'Supercompany',
    maxPtoDays: 21,
    // @ts-ignore
    teams,
  })
}
