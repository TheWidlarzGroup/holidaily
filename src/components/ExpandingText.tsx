import React, { useCallback, useState } from 'react'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { useBooleanState } from 'hooks/useBooleanState'

type ExpandingTextProps = React.ComponentProps<typeof Text> & {
  text: string
  lines?: number
}

const ICON_SIZE = 13

export const ExpandingText = ({ text, lines = 3, ...textProps }: ExpandingTextProps) => {
  const [numOfLines, setNumOfLines] = useState(lines)
  const [opened, { toggle }] = useBooleanState(false)
  const styles = useStyles()

  const onTextLayout = useCallback((e) => {
    const textLines = e?.nativeEvent?.lines.length
    setNumOfLines(textLines)
  }, [])

  return (
    <BaseOpacity onPress={toggle} activeOpacity={1}>
      <Text
        {...textProps}
        onTextLayout={onTextLayout}
        numberOfLines={opened ? undefined : 3}
        variant="textSM"
        lineHeight={21}
        paddingRight={!opened && numOfLines >= 3 ? 'ml' : 'none'}>
        {text}
      </Text>
      {!opened && numOfLines >= 3 && (
        <Box position="absolute" bottom={5} right={2}>
          <ArrowDown color={styles.arrow.color} width={ICON_SIZE} />
        </Box>
      )}
    </BaseOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  arrow: {
    color: theme.colors.black,
  },
}))
