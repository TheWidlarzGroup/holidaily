import React, { FC } from 'react'

import { Box, mkUseStyles, Text } from 'utils/theme'
import BackArrowIcon from 'assets/icons/icon-back2.svg'
import { TouchableOpacity } from 'react-native'

type DrawerBackArrowProps = {
  goBack: () => void
  title?: string
}

export const DrawerBackArrow: FC<DrawerBackArrowProps> = ({ goBack, title = '' }) => {
  const styles = useStyles()
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
      paddingVertical="m">
      <TouchableOpacity onPress={goBack} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <BackArrowIcon height={18} width={18} color={styles.arrow.color} />
      </TouchableOpacity>
      <Box flex={1}>
        <Text variant="boldBlackCenter20" color="black">
          {title}
        </Text>
      </Box>
      <Box width={8} />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  arrow: {
    color: theme.colors.black,
  },
}))
