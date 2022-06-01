import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'utils/theme'
import { Bubble } from './Bubble'

type BubbleProps = { onPress: F0 }

export const LessBubble = ({ onPress }: BubbleProps) => {
  const { t } = useTranslation('feed')

  return (
    <Bubble
      margin="xs"
      onPress={() => onPress()}
      borderColor="transparent"
      borderWidth={1.2}
      height={42}>
      <Text padding="s" variant="primaryBold12" color="black">
        {t('showLess')}
      </Text>
    </Bubble>
  )
}
