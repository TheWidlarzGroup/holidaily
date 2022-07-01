import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import BackArrowIcon from 'assets/icons/icon-back2.svg'

type DrawerBackArrowProps = {
  goBack: () => void
  title?: string
}

export const DrawerBackArrow = ({ goBack, title = '' }: DrawerBackArrowProps) => {
  const styles = useStyles()
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
      paddingVertical="m">
      <BaseOpacity
        zIndex="10"
        onPress={goBack}
        hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
        <BackArrowIcon height={18} width={18} color={styles.arrow.color} />
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
