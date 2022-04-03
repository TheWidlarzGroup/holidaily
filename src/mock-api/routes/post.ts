import { Server, Request } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { commentsMock } from 'mockApi/factories/posts'
import { Schema as ModelsSchema } from '../models'

export function postsRoute(context: Server<ModelsSchema>) {
  context.get('/posts', fetchPosts)
  context.post('/addpost', addPost)
  context.post('/posts/:postId', addComment)
}
function fetchPosts(schema: Schema<ModelsSchema>) {
  return schema.all('post')
}

function addPost(schema: Schema<ModelsSchema>, req: Request) {
  const body = JSON.parse(req.requestBody)
  return schema.create('post', body)
}

function addComment(schema: Schema<ModelsSchema>, req: Request) {
  const body = JSON.parse(req.requestBody)
  const getPost = schema.find('post', body.postId)
  return getPost?.update({ comments: [body] })
}
