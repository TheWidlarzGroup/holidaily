import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import BackArrowIcon from 'assets/icons/icon-back2.svg'
import { Color } from 'react-native-svg'

type DrawerBackArrowProps = {
  goBack: () => void
  title?: string
  arrowColor?: Color
}

export const DrawerBackArrow = ({ goBack, title = '', arrowColor }: DrawerBackArrowProps) => {
  const styles = useStyles()
  return (
    <Box
      zIndex="2"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
      paddingVertical="m">
      <BaseOpacity
        zIndex="10"
        onPress={goBack}
        hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
        <BackArrowIcon height={18} width={18} color={arrowColor || styles.arrow.color} />
      </BaseOpacity>
      <Box flex={1}>
        <Text variant="displayBoldSM">{title}</Text>
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
