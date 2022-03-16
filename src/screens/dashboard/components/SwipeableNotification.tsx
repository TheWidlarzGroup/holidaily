import React from 'react'
import { useTranslation } from 'react-i18next'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import CheckIcon from 'assets/icons/icon-check.svg'

export const SwipeableNotification = ({ children }: { children: React.ReactElement }) => {
  const { t } = useTranslation('notifications')
  const theme = useTheme()
  const LeftActions = () => (
    <Box
      backgroundColor="primary"
      marginBottom="m"
      borderBottomLeftRadius="lmin"
      borderTopLeftRadius="lmin"
      width="40%">
      <BaseOpacity
        width="100%"
        height="100%"
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="l"
        onPress={() => console.log('mark as seen')}>
        <Box marginRight="s">
          <CheckIcon color={theme.colors.white} />
        </Box>

        <Text variant="boldBlack18" color="white" lineHeight={22}>
          {t('markSeen')}
        </Text>
      </BaseOpacity>
      <Box
        position="absolute"
        backgroundColor="primary"
        width={400}
        height="100%"
        left={20}
        zIndex="-1"
      />
    </Box>
  )

  return (
    <Swipeable renderLeftActions={LeftActions} leftThreshold={80}>
      {children}
    </Swipeable>
  )
}
