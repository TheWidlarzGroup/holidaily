import { useUserContext } from 'hooks/useUserContext'
import { DrawerNavigationProps } from 'navigation/types'
import React, { FC, useEffect } from 'react'
import { Box } from 'utils/theme'

type LogoutProps = DrawerNavigationProps<'Logout'>

export const Logout: FC<LogoutProps> = ({ navigation }) => {
  const { handleUserDataChange } = useUserContext()

  useEffect(() => {
    navigation.addListener('focus', () => {
      handleUserDataChange(null)
    })
  })
  return <Box></Box>
}
