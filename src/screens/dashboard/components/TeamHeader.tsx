import React from 'react'
import { Box, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'
import IconDots from 'assets/icons/icon-dots.svg'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type TeamHeaderProps = {
  title: string
}
export const TeamHeader = (props: TeamHeaderProps) => {
  const { title } = props
  const { goBack } = useNavigation()
  return (
    <Box
      paddingVertical="lplus"
      backgroundColor="disabledText"
      borderBottomRightRadius="lmin"
      borderBottomLeftRadius="lmin"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <TouchableOpacity onPress={goBack}>
        <IconBack />
      </TouchableOpacity>
      <Text variant="header">{title}</Text>
      <TouchableOpacity>
        <IconDots />
      </TouchableOpacity>
    </Box>
  )
}
