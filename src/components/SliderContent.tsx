import React, { FC } from 'react'
import { Dimensions, ImageSourcePropType, Image } from 'react-native'
import { Box, Text } from 'utils/theme/index'
import { isSmallScreen } from 'utils/deviceSizes'

const { width } = Dimensions.get('window')

type SliderContentProps = {
  title: string
  text: string
  image: ImageSourcePropType
}

const imgStyles = {
  width: '75%',
  maxWidth: 240,
}

export const SliderContent: FC<SliderContentProps> = ({ title, text, image }) => (
  <Box width={width} alignItems="center" justifyContent="space-around">
    <Box
      justifyContent="center"
      alignItems="center"
      aspectRatio={isSmallScreen ? 1.4 : 1}
      width="100%"
      backgroundColor="primary"
      marginTop="-ml"
      marginBottom="-ml">
      <Image style={imgStyles} source={image} resizeMode="contain" />
    </Box>
    <Box maxWidth="80%" justifyContent="center" alignItems="center">
      <Text variant="title1" paddingBottom="m" color="alwaysBlack">
        {title}
      </Text>
      <Text variant="body1" color="alwaysBlack">
        {text}
      </Text>
    </Box>
  </Box>
)
