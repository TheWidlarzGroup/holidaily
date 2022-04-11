import { Notification } from 'mockApi/models'

export type NotificationSchemaType = {
  name: 'Notification'
  primaryKey: 'id'
  properties: Record<keyof NotificationModelProps, string>
}

export type NotificationModelProps = Omit<Notification, 'source'> & {
  sourceId: string
  endDate?: string
}

export const NotificationSchema: NotificationSchemaType = {
  name: 'Notification',
  primaryKey: 'id',
  properties: {
    id: 'string',
    createdAt: 'string',
    sourceId: 'string',
    wasSeenByHolder: 'bool',
    holderId: 'string',
    type: 'string',
    endDate: 'string?',
  },
}

export type Models = {
  Notification: NotificationModelProps
}

export const Schemas = [NotificationSchema]
