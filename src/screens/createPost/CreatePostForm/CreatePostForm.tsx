import React from 'react'
import { GalleryItemData } from 'types/holidaysDataTypes'
import { Asset } from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { useBooleanState } from 'hooks/useBooleanState'
import { KeyboardAvoidingView } from 'react-native'
import { PostHeader } from './PostFormHeader'
import { PostBody } from './PostFormBody'
import { PostState, usePostFormReducer } from './usePostFormReducer'
import { PostFooter } from './PostFormFooter/PostFormFooter'
import { ModalLocationPicker } from './ModalLocationPicker'
import { Submit } from './PostFormFooter/Submit'

type CreatePostFormProps = {
  onSend: F1<PostState>
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const [state, dispatch] = usePostFormReducer()
  const [locationPickerOpened, { setTrue: openLocationPicker, setFalse: hideLocationPicker }] =
    useBooleanState(false)

  const galleryImages = state.images.map(assetToGalleryItem)

  const sendDisabled = isSendDisabled(state)
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <PostHeader />
        <ScrollView>
          <PostBody
            text={state.text}
            location={state.location}
            onTextChange={(text) => dispatch({ type: 'updateText', payload: { text } })}
            data={galleryImages}
          />
        </ScrollView>
        <PostFooter
          onLocationPress={openLocationPicker}
          onImagesPick={(images) => dispatch({ type: 'addImages', payload: { images } })}
        />
      </KeyboardAvoidingView>
      <Submit disabledCTA={sendDisabled} onCTAPress={() => props.onSend(state)} />
      <ModalLocationPicker
        visible={locationPickerOpened}
        onLocationChange={(locationPayload) => {
          dispatch({ type: 'setLocation', payload: locationPayload })
          hideLocationPicker()
        }}
        onRequestClose={hideLocationPicker}
      />
    </>
  )
}

const assetToGalleryItem = (asset: Asset): GalleryItemData => ({
  type: asset.type ? 'image' : 'video',
  src: asset.uri ?? '',
})

const isSendDisabled = ({ text, images }: PostState) => text.length === 0 && images.length === 0
