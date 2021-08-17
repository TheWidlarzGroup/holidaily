import React, { useEffect } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import { useUserData } from 'hooks/useUserData'
import { getItemAsync } from 'expo-secure-store'
import SplashScreen from 'react-native-splash-screen'
import { authorizeClient } from 'graphqlActions/client'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { ModalNavigation } from './ModalNavigation'

type LoginStatusTypes = 'BeforeCheck' | 'LoggedIn' | 'LoginRequired'

export const AppNavigation = () => {
  const { user } = useUserContext()
  const { fetchUser } = useUserData()
  const [loginStatus, setLoginStatus] = React.useState<LoginStatusTypes>('BeforeCheck')

  useEffect(() => {
    const func = async () => {
      const authToken = await getItemAsync('token')
      if (!authToken) return setLoginStatus('LoginRequired')
      authorizeClient(authToken)
      fetchUser()
    }
    func()
  }, [fetchUser, user])

  useEffect(() => {
    if (user) return setLoginStatus('LoggedIn')
  }, [user])
  useEffect(() => {
    if (loginStatus !== 'BeforeCheck') SplashScreen.hide()
  }, [loginStatus])

  return (
    <NavigationContainer linking={linking}>
      {loginStatus === 'BeforeCheck' && null}
      {loginStatus === 'LoggedIn' && <ModalNavigation />}
      {loginStatus === 'LoginRequired' && <AuthStackNavigation />}
    </NavigationContainer>
  )
}
