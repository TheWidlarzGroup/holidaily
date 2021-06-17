import React, { useCallback, useState } from 'react'
import { Text } from 'utils/theme'

type ExpandingTextProps = {
  text: string
  lines?: number
  props?: Partial<typeof Text>
}

// TODO: Animation on toggling

export const ExpandingText = ({ text, lines = 3, ...props }: ExpandingTextProps) => {
  const [numOfLines, setNumOfLines] = useState(lines)

  const handlePress = useCallback(() => {
    setNumOfLines((old) => (old === lines ? 999 : lines))
  }, [lines])

  return (
    <Text {...props} numberOfLines={numOfLines} onPress={handlePress}>
      {text}
    </Text>
  )
}
