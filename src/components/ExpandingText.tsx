import React, { useState } from 'react'
import { BaseOpacity, Text } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { useTranslation } from 'react-i18next'

type ExpandingTextProps = React.ComponentProps<typeof Text> & {
  text: string
  lines?: number
}

export const ExpandingText = ({ text, lines = 3, ...textProps }: ExpandingTextProps) => {
  const { t } = useTranslation('feed')
  const [numOfLines, setNumOfLines] = useState(lines)
  const [opened, { toggle }] = useBooleanState(false)

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const textLines = e?.nativeEvent?.lines.length
    setNumOfLines(textLines)
  }

  const numberOfChars = opened ? 999 : 130

  return (
    <BaseOpacity onPress={toggle} activeOpacity={1}>
      <Text
        {...textProps}
        onTextLayout={onTextLayout}
        numberOfLines={opened ? undefined : 3}
        variant="textSM"
        lineHeight={21}
        paddingRight={!opened && numOfLines >= 3 ? 'ml' : 'none'}
        paddingBottom="xxm">
        {text.slice(0, numberOfChars)}
        {text.length > 130 && !opened && (
          <>
            {'... '}
            <Text variant="textSM" color="special">
              {t('seeMoreCapitalized')}
            </Text>
          </>
        )}
        {opened && (
          <Text variant="textSM" color="special">
            {t('showLessCapitalized')}
          </Text>
        )}
      </Text>
    </BaseOpacity>
  )
}
