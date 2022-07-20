// @ts-nocheck
import { Request, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { requireAuth } from 'mockApi/utils/requireAuth'
import { generateUUID } from 'utils/generateUUID'
import { Reaction, Schema as ModelsSchema } from '../models'

export function postsRoute(context: Server<ModelsSchema>) {
  context.get('/posts', fetchPosts)
  context.post('/addpost', addPost)
  context.post('/addpost/postId', addPostWithNewId)
  context.post('/posts/:postId', addComment)
  context.put('/posts/:postId', addReaction)
  context.delete('/comment/:id', deleteComment)
  context.put('/comment/:id', editComment)
  context.put('/posts/edit/:postId', editPost)
  context.delete('/posts/:postId', deletePost)
}
function fetchPosts(schema: Schema<ModelsSchema>) {
  return schema.all('post')
}

function addPost(schema: Schema<ModelsSchema>, req: Request) {
  const post = JSON.parse(req.requestBody)
  schema.create('post', post)
  return post
}

function addPostWithNewId(schema: Schema<ModelsSchema>, req: Request) {
  // Comment: when newly added post is deleted and it's posted back with the same data,
  // mirage shows error 500, because new post has the same id as old post
  const post = JSON.parse(req.requestBody)
  const postWithNewId = { ...post, id: generateUUID() }
  schema.create('post', postWithNewId)
  return postWithNewId
}

function editPost(schema: Schema<ModelsSchema>, req: Request) {
  const body = JSON.parse(req.requestBody)
  const post = schema.find('post', req.params.postId)
  if (!post) return new Response(404)
  post.update(body)
  return post
}

function deletePost(schema: Schema<ModelsSchema>, req: Request) {
  const post = schema.find('post', req.params.postId)
  if (!post) return new Response(404)
  post.destroy()
  return post.id
}

function addComment(schema: Schema<ModelsSchema>, req: Request) {
  const body = JSON.parse(req.requestBody)
  const post = schema.find('post', body.postId)
  if (!post) return new Response(404)
  schema.create('comment', { ...body.comment, post })
  return post
}

function editComment(schema: Schema<ModelsSchema>, req: Request) {
  const body = JSON.parse(req.requestBody)
  const comment = schema.find('comment', body.commentId)
  const post = schema.find('post', comment.postId)
  if (!comment || !post) return new Response(404)
  comment.update({ text: body.text })
  return post
}

function deleteComment(schema: Schema<ModelsSchema>, req: Request) {
  const comment = schema.find('comment', req.requestBody)
  const post = schema.find('post', comment.postId)
  if (!comment || !post) return new Response(404)
  comment.destroy()
  return post
}

function addReaction(schema: Schema<ModelsSchema>, req: Request) {
  const user = requireAuth(schema, req)
  const body = JSON.parse(req.requestBody)
  const post = schema.find('post', body.postId)
  if (!post || !user.id) return new Response(404)
  const allPostReactions = post.reactionIds.map((id) => schema.find('reaction', id))
  const filterReactions = allPostReactions.filter(
    (reaction: Reaction) => reaction.type === body.reaction.type
  )
  if (filterReactions.length > 0) {
    const singleReaction = schema.find('reaction', filterReactions[0].id)
    if (singleReaction?.users?.includes(user.id.toString())) {
      if (singleReaction.users?.length > 1) {
        const filteredUsersReaction = singleReaction?.users.filter((usr) => usr !== user.id)
        singleReaction?.update({ users: [...filteredUsersReaction] })
      } else singleReaction.destroy()
    } else singleReaction?.update({ users: [...singleReaction?.users, user.id.toString()] })
  } else schema.create('reaction', { ...body.reaction, post })
  return post
}
