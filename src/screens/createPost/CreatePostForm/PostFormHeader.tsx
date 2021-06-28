import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'

type HeaderBtnProps = {
  element: React.ReactNode
  onPress: F0
}

type PostHeaderProps = {
  left?: HeaderBtnProps
  right?: HeaderBtnProps
}

export const PostHeader = ({ left, right }: PostHeaderProps) => {
  const { t } = useTranslation('createPost')
  return (
    <>
      <Box flexDirection="row" alignItems="center" padding="m">
        {left && (
          <BaseOpacity padding="l" position="absolute" onPress={left.onPress}>
            {left.element}
          </BaseOpacity>
        )}
        <Box flexGrow={1} zIndex="0">
          <Text variant="boldBlack18" textAlign="center">
            {t('title')}
          </Text>
        </Box>
        {right && (
          <BaseOpacity padding="l" right={0} position="absolute" onPress={right.onPress}>
            {right.element}
          </BaseOpacity>
        )}
      </Box>
    </>
  )
}

// const HeaderBtn = ({ element, onPress }: HeaderBtnProps) => (
//   <BaseOpacity padding="l" onPress={onPress}>
//     {element}
//   </BaseOpacity>
// )
