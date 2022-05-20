import React, { useEffect } from 'react'
import { GalleryItemData } from 'types/holidaysDataTypes'
import { Asset } from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { useBooleanState } from 'hooks/useBooleanState'
import { Submit } from 'components/Submit'
import { KeyboardAvoidingView } from 'react-native'
import { useTheme } from 'utils/theme'
import { PostHeader } from './PostFormHeader'
import { PostBody } from './PostFormBody'
import { PostState, usePostFormReducer } from './usePostFormReducer'
import { ModalLocationPicker } from './ModalLocationPicker'
import { PostFormFooter } from './PostFormFooter/PostFormFooter'

type CreatePostFormProps = {
  onSend: F1<PostState>
  photosAsset?: Asset
}

export const CreatePostForm = ({ onSend, photosAsset }: CreatePostFormProps) => {
  const [state, dispatch] = usePostFormReducer()
  const [locationPickerOpened, { setTrue: openLocationPicker, setFalse: hideLocationPicker }] =
    useBooleanState(false)
  const theme = useTheme()

  const galleryImages = state.images.map(assetToGalleryItem)
  const sendDisabled = isSendDisabled(state)

  useEffect(() => {
    if (photosAsset) {
      dispatch({ type: 'addImages', payload: { images: [photosAsset] } })
    }
  }, [dispatch, photosAsset])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        behavior="height">
        <PostHeader />
        <ScrollView>
          <PostBody
            text={state.text}
            location={state.location}
            onTextChange={(text) => dispatch({ type: 'updateText', payload: { text } })}
            data={galleryImages}
          />
        </ScrollView>
        <PostFormFooter
          onLocationPress={openLocationPicker}
          onImagesPick={(images) => dispatch({ type: 'addImages', payload: { images } })}
          imagesCount={state.images.length}
        />
      </KeyboardAvoidingView>
      <Submit disabledCTA={sendDisabled} onCTAPress={() => onSend(state)} />
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
