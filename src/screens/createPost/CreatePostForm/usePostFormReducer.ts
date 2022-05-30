import { CompoundLocation } from 'hooks/useLocation'
import { useReducer } from 'react'
import { Asset } from 'react-native-image-picker'
import { generateUUID } from 'utils/generateUUID'

export type PostState = {
  readonly text: string
  readonly images: Asset[]
  readonly location: Maybe<CompoundLocation>
}

export type PostAction =
  | {
      type: 'updateText'
      payload: { text: string }
    }
  | {
      type: 'setLocation'
      payload: Maybe<CompoundLocation>
    }
  | {
      type: 'addImages'
      payload: { images: Asset[] }
    }
  | {
      type: 'removeImage'
      payload: { id: string }
    }
  | {
      type: 'reset'
    }

const initState: PostState = { text: '', images: [], location: null }

const reducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'updateText': {
      return { ...state, text: action.payload.text }
    }
    case 'setLocation': {
      return { ...state, location: action.payload }
    }
    case 'addImages': {
      const { images } = action.payload
      const uris = images.map((img) => img.uri ?? '')
      const imagesWithId = images.map((img) => ({ ...img, id: generateUUID() }))
      return { ...state, images: [...filterAssets(state.images, uris), ...imagesWithId] }
    }
    case 'removeImage': {
      const { id } = action.payload
      return { ...state, images: deleteAsset(state.images, id) }
    }
    case 'reset':
      return initState
    default:
      return state
  }
}

export const usePostFormReducer = () => useReducer(reducer, initState)

const filterAssets = (assets: Asset[], uris: string[]) =>
  assets.filter((asset) => !uris.includes(asset.uri ?? ''))

const deleteAsset = (assets: Asset[], id: string) => assets.filter((asset) => asset.id !== id)
