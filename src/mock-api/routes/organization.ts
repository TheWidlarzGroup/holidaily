// @ts-nocheck
import { isAfter, isBefore } from 'date-fns'
import { Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function organizationRoute(context: Server<ModelsSchema>) {
  context.get('/organization', fetchOrganization)
}
function fetchOrganization(schema: Schema<ModelsSchema>) {
  const response = schema.all('organization')
  const teams = response.models[0].teamIds.map((id) => schema.find('team', id))
  response.models[0].teamIds.forEach((id: string) => {
    const team = schema.find('team', id)
    if (!team) return response
    team.userIds.forEach((id) => {
      const user = schema.find('user', id)
      if (!user || !user.id) return
      const requests = schema.where('request', { userId: user.id })
      const isOnHoliday = requests.models.some((req) => {
        const isTodayAfterStart = isAfter(Date.now(), new Date(req.startDate))
        const isTodayBeforeEnd = isBefore(Date.now(), new Date(req.endDate))
        return isTodayAfterStart && isTodayBeforeEnd
      })
      // Comment: providing users as an empty array to simplify things in demo app
      const userTeams = teams
        .filter((t) => t.userIds.some((id) => id === user.id))
        .map((t) => ({ id: t.id, name: t.name, users: [] }))
      user.update({
        isOnHoliday,
        teams: userTeams,
      })
    })
  })
  return response
}
