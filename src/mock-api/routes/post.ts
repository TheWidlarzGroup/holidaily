import { Server, Request } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { requireAuth } from 'mockApi/utils/requireAuth'
import { Reaction, Schema as ModelsSchema } from '../models'

export function postsRoute(context: Server<ModelsSchema>) {
  context.get('/posts', fetchPosts)
  context.post('/addpost', addPost)
  context.post('/posts/:postId', addComment)
  context.put('/posts/:postId', addReaction)
  context.delete('/posts/:postId', deleteReaction)
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
  // @ts-ignore
  if (!getPost) return new Response(404)
  schema.create('comment', { ...body.comment, post: getPost })
  return getPost
}

function addReaction(schema: Schema<ModelsSchema>, req: Request) {
  const user = requireAuth(schema, req)

  const body = JSON.parse(req.requestBody)
  const getPost = schema.find('post', body.postId)
  // @ts-ignore
  if (!getPost || !user.id) return new Response(404)
  // @ts-ignore
  const allPostReactions = getPost.reactionIds.map((id) => schema.find('reaction', id))
  const filterReactions = allPostReactions.filter(
    (reaction: Reaction) => reaction.type === body.reaction.type
  )
  if (filterReactions.length > 0) {
    const singleReaction = schema.find('reaction', filterReactions[0].id)
    // @ts-ignore
    singleReaction?.update({ users: [...singleReaction?.users, user.id.toString()] })
  } else if (filterReactions.length <= 0) {
    schema.create('reaction', { ...body.reaction, post: getPost })
  }
  return getPost
}

function deleteReaction(schema: Schema<ModelsSchema>, req: Request) {
  const body = JSON.parse(req.requestBody)
  const getPost = schema.find('post', body.postId)
  // @ts-ignore
  if (!getPost) return new Response(404)
  schema.create('reaction', { ...body.reaction, post: getPost })
  return getPost
}
