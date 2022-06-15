import React from 'react'
import { BaseOpacity, Text } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useTranslation } from 'react-i18next'

type ExpandingTextProps = React.ComponentProps<typeof Text> & {
  text: string
  lines?: number
}

export const ExpandingText = ({ text, ...textProps }: ExpandingTextProps) => {
  const { t } = useTranslation('feed')
  const [opened, { toggle }] = useBooleanState(false)

  const numberOfChars = opened ? 999 : 130

  return (
    <BaseOpacity onPress={toggle} activeOpacity={1}>
      <Text
        {...textProps}
        numberOfLines={opened ? undefined : 3}
        variant="textSM"
        lineHeight={21}
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
