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
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        paddingLeft="m">
        <IconBack height={18} width={18} />
      </BaseOpacity>
      <Text variant="header">{title}</Text>
      <Box paddingRight="xl" paddingVertical="lplus" />
    </ModalHeader>
  )
}
