import React from 'react'
import { Box } from 'utils/theme'
import { Gallery } from 'components/Gallery/Gallery'
import { GalleryItemData } from 'types/holidaysDataTypes'
import { Asset } from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { PostHeader } from './PostFormHeader'
import { PostBody } from './PostFormBody'
import { PostFooter } from './PostFormFooter'
import { useKeyboard } from '../useKeyboard'
import { PostState, usePostFormReducer } from './usePostFormReducer'

type CreatePostFormProps = {
  onSend: F1<PostState>
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const [state, dispatch] = usePostFormReducer()
  const [keyboardOpened] = useKeyboard()

  const galleryImages = state.images.map(assetToGalleryItem)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PostHeader />
      <Box flexGrow={1} padding="s">
        <Box paddingBottom="m">
          <PostBody
            text={state.text}
            onTextChange={(text) => dispatch({ type: 'updateText', payload: { text } })}
          />
        </Box>
        <Gallery data={galleryImages} />
      </Box>
      {!keyboardOpened && (
        <PostFooter
          onCTAPress={() => props.onSend(state)}
          onImagesPick={(images) => dispatch({ type: 'addImages', payload: { images } })}
        />
      )}
    </ScrollView>
  )
}

const assetToGalleryItem = (asset: Asset): GalleryItemData => ({
  type: asset.type ? 'image' : 'video',
  src: asset.uri ?? '',
})
