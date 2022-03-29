import React from 'react'
import { Box, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ModalHeader } from 'components/ModalHeader'

type TeamHeaderProps = {
  title: string
}
export const TeamHeader = (props: TeamHeaderProps) => {
  const { title } = props
  const { goBack } = useNavigation()
  return (
    <ModalHeader>
      <TouchableOpacity onPress={goBack}>
        <IconBack />
      </TouchableOpacity>
      <Text variant="header">{title}</Text>
      <Box paddingRight="xl" />
    </ModalHeader>
  )
}
