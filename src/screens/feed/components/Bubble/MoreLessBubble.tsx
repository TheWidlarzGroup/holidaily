import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'utils/theme'
import { Bubble } from './Bubble'

type BubbleProps = {
  type: 'more' | 'less'
  onPress: F0
  count?: number
}

export const MoreLessBubble = ({ count, onPress, type }: BubbleProps) => {
  const { t } = useTranslation('feed')

  return (
    <Bubble
      margin="xs"
      onPress={() => onPress()}
      borderColor="transparent"
      borderWidth={1.2}
      height={42}>
      <Text padding="s" variant="buttonXS" color="black">
        {type === 'more' ? `${count} ${t('more')}` : t('showLess')}
      </Text>
    </Bubble>
  )
}
