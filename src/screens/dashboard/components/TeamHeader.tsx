import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back2.svg'
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
      <BaseOpacity
        onPress={goBack}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        paddingLeft="m">
        <IconBack height={18} width={18} />
      </BaseOpacity>
      <Text variant="header">{title}</Text>
      <Box paddingRight="xl" />
    </ModalHeader>
  )
}
