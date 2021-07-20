import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { usePrevSelection } from 'screens/editProfile/helpers/usePrevSelection'
import { Box, Text, mkUseStyles, Theme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back-white.svg'
import { Bubble } from './Bubble'

export type Position = {
  x: number
  y: number
}

type ColorProps = {
  id: number | string
  color: string
}
const COLORS: ColorProps[] = [
  {
    color: 'red',
    id: 1,
  },
  {
    color: 'blue',
    id: 2,
  },
  {
    color: 'pink',
    id: 3,
  },
  {
    color: 'orange',
    id: 4,
  },
  {
    color: 'grey',
    id: 5,
  },
  {
    color: 'green',
    id: 6,
  },
  {
    color: 'red',
    id: 7,
  },
  {
    color: 'blue',
    id: 8,
  },
  {
    color: 'pink',
    id: 9,
  },
  {
    color: 'orange',
    id: 10,
  },
  {
    color: 'grey',
    id: 11,
  },
  {
    color: 'green',
    id: 12,
  },
]

type BubbleProps = {
  position: Position
  id: number | string
  color: string
}

export const BubbleContainer = () => {
  const diameter = 56
  const styles = useStyles()
  const { goBack } = useNavigation()
  const { width, height } = useWindowDimensions()
  const [selectedColorId, setSelectedColorId] = useState<number | string>(-1)
  const prevSelection = usePrevSelection(selectedColorId)

  const handleSelection = (id: number | string) => {
    setSelectedColorId(id)
  }

  const randomFromRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  const initBubbles = COLORS.map((color) => ({
    ...color,
    position: {
      x: randomFromRange(diameter, width - diameter),
      y: randomFromRange(diameter, height - diameter),
    },
  }))

  const [bubbles] = useState<BubbleProps[]>(initBubbles)

  // const handleBubbleUpdate = (id: number | string, position: Position) => {
  //   setBubbles(bubbles.map((bubble) => (bubble.id === id ? { ...bubble, position } : bubble)))
  // }

  // CIRCLE COLLISIONS EXAMPLE
  //   var circle1 = {radius: 20, x: 5, y: 5};
  // var circle2 = {radius: 12, x: 10, y: 5};

  // var dx = circle1.x - circle2.x;
  // var dy = circle1.y - circle2.y;
  // var distance = Math.sqrt(dx * dx + dy * dy);

  // if (distance < circle1.radius + circle2.radius) {
  //     // collision detected!
  // }

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', flexWrap: 'wrap' }}>
      <TouchableOpacity activeOpacity={0.2} onPress={goBack} style={styles.backBtn}>
        <IconBack />
      </TouchableOpacity>
      <Box marginTop="xxxl" alignItems="center" width="100%">
        <Text variant="buttonText1">Pick your favourite color</Text>
      </Box>
      {bubbles.map((bubble) => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={diameter}
            setSelection={handleSelection}
            selection={selectedColorId}
            prevSelection={prevSelection}
          />
        </Box>
      ))}
    </View>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 65,
    zIndex: theme.zIndices['5'],
  },
}))
