import { Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function postsRoute(context: Server<ModelsSchema>) {
  context.get('/posts', fetchPosts)
}
function fetchPosts(schema: Schema<ModelsSchema>) {
  return schema.all('post')
}
