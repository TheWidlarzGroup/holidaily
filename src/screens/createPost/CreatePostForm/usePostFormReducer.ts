import { useReducer } from 'react'
import { Asset } from 'react-native-image-picker'

export type PostState = {
  readonly text: string
  readonly images: Asset[]
}

export type PostAction =
  | {
      type: 'updateText'
      payload: { text: string }
    }
  | {
      type: 'addImages'
      payload: { images: Asset[] }
    }
  | {
      type: 'removeImages'
      payload: { uris: string[] }
    }
  | {
      type: 'reset'
    }

const initState: PostState = { text: '', images: [] }

const reducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'updateText': {
      return { ...state, text: action.payload.text }
    }
    case 'addImages': {
      const { images } = action.payload
      const uris = images.map((img) => img.uri ?? '')
      return { ...state, images: [...filterAssets(state.images, uris), ...images] }
    }
    case 'removeImages': {
      const { uris } = action.payload
      return { ...state, images: filterAssets(state.images, uris) }
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
