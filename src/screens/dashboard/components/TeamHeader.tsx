import React from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { ModalHeader } from 'components/ModalHeader'

type TeamHeaderProps = {
  title: string
}

export const TeamHeader = (props: TeamHeaderProps) => {
  const { title } = props
  const theme = useTheme()
  const { goBack } = useNavigation()

  return (
    <ModalHeader>
      <BaseOpacity
        onPress={goBack}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        paddingLeft="m">
        <IconBack height={16} width={16} color={theme.colors.black} />
      </BaseOpacity>
      <Text variant="displayBoldSM" color="black">
        {title}
      </Text>
      <Box paddingRight="xl" paddingVertical="lplus" />
    </ModalHeader>
  )
}
