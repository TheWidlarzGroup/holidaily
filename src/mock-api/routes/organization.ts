import { isAfter, isBefore } from 'date-fns'
import { Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function organizationRoute(context: Server<ModelsSchema>) {
  context.get('/organization', fetchOrganization)
}
function fetchOrganization(schema: Schema<ModelsSchema>) {
  const response = schema.all('organization')
  // @ts-expect-error typescript assumes that the model contains team prop instead of teamIds, but in fact the team is a relation so mirage assigns only an array with {{relationName}Ids to the model
  response.models[0].teamIds.forEach((id: string) => {
    console.log('IDDD', id)
    const team = schema.find('team', id)
    if (!team) return response
    // @ts-expect-error mirage type  for schema.find is outdated. Typescript expects find to return an array of matching models, but in fact it returns only the frist mathing one
    team.userIds.forEach((id) => {
      const user = schema.find('user', id)
      if (!user || !user.id) return
      // @ts-expect-error
      const requests = schema.where('request', { userId: user.id })
      const isOnHoliday = requests.models.some((req) => {
        // @ts-expect-error typescript acts like the model has its properties wrapped in attrs prop, which is not true.
        const isTodayAfterStart = isAfter(Date.now(), new Date(req.startDate))
        // @ts-expect-error
        const isTodayBeforeEnd = isBefore(Date.now(), new Date(req.endDate))
        return isTodayAfterStart && isTodayBeforeEnd
      })
      user.update({
        // @ts-expect-error typescript expects a function here, while the documentation states that the argument should be an object with new props
        isOnHoliday,
      })
    })
  })
  return response
}
