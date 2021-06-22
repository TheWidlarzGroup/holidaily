import React, { useCallback, useState } from 'react'
import { Text } from 'utils/theme'

type ExpandingTextProps = React.ComponentProps<typeof Text> & {
  text: string
  lines?: number
}

// TODO: Animation on toggling

export const ExpandingText = ({ text, lines = 3, ...textProps }: ExpandingTextProps) => {
  const [numOfLines, setNumOfLines] = useState(lines)

  const handlePress = useCallback(() => {
    setNumOfLines((old) => (old === lines ? 999 : lines))
  }, [lines])

  return (
    <Text {...textProps} numberOfLines={numOfLines} onPress={handlePress}>
      {text}
    </Text>
  )
}
