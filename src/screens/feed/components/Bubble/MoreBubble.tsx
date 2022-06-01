import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'utils/theme'
import { Bubble } from './Bubble'

type BubbleProps = { count: number; onPress: F0 }

export const MoreBubble = ({ count, onPress }: BubbleProps) => {
  const { t } = useTranslation('feed')

  return (
    <Bubble
      margin="xs"
      onPress={() => onPress()}
      borderColor="transparent"
      borderWidth={1.2}
      height={42}>
      <Text padding="s" variant="primaryBold12" color="black">
        {count} {t('more')}
      </Text>
    </Bubble>
  )
}
