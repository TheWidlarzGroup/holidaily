import React from 'react'
import { GalleryItemData } from 'types/holidaysDataTypes'
import { Asset } from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { useKeyboard } from 'hooks/useKeyboard'
import { PostHeader } from './PostFormHeader'
import { PostBody } from './PostFormBody'
import { PostState, usePostFormReducer } from './usePostFormReducer'
import { PostFooter } from './PostFormFooter/PostFormFooter'

type CreatePostFormProps = {
  onSend: F1<PostState>
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const [state, dispatch] = usePostFormReducer()
  const [keyboardOpened] = useKeyboard()

  const galleryImages = state.images.map(assetToGalleryItem)

  const sendDisabled = isSendDisabled(state)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PostHeader />
      <PostBody
        text={state.text}
        onTextChange={(text) => dispatch({ type: 'updateText', payload: { text } })}
        data={galleryImages}
      />
      {!keyboardOpened && (
        <PostFooter
          disabledCTA={sendDisabled}
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

const isSendDisabled = ({ text, images }: PostState) => text.length === 0 && images.length === 0
