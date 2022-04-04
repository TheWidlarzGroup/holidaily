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
  response.models[0].teamIds.forEach((id: string) => {
    console.log('IDDD', id)
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
      user.update({
        isOnHoliday,
      })
    })
  })
  return response
}
