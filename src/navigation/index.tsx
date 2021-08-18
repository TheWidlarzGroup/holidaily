import React, { useEffect } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import { useUserData } from 'hooks/useUserData'
import { getItemAsync } from 'expo-secure-store'
import SplashScreen from 'react-native-splash-screen'
import { authorizeClient } from 'graphqlActions/client'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { AppStackNavigation } from './AppStackNavigation'

type LoginStatusTypes = 'BeforeCheck' | 'LoggedIn' | 'LoginRequired'

export const AppNavigation = () => {
  const { user } = useUserContext()
  const { fetchUser } = useUserData()
  const [loginStatus, setLoginStatus] = React.useState<LoginStatusTypes>('BeforeCheck')

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (user) return setLoginStatus('LoggedIn')
      const authToken = await getItemAsync('token')
      if (!authToken) return setLoginStatus('LoginRequired')
      authorizeClient(authToken)
      fetchUser()
    }
    checkLoginStatus()
  }, [fetchUser, user])

  useEffect(() => {
    if (loginStatus !== 'BeforeCheck') SplashScreen.hide()
  }, [loginStatus])

  return (
    <NavigationContainer linking={linking}>
      {loginStatus === 'BeforeCheck' && null}
      {loginStatus === 'LoggedIn' && <AppStackNavigation />}
      {loginStatus === 'LoginRequired' && <AuthStackNavigation />}
    </NavigationContainer>
  )
}
