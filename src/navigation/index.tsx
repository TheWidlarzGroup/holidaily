import React, { useEffect } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import { useUserData } from 'hooks/useUserData'
import { getItemAsync } from 'expo-secure-store'
import SplashScreen from 'react-native-splash-screen'
import { Splash } from 'screens/splash/Splash'
import { authorizeClient } from 'graphqlActions/client'
import { sleep } from 'utils/sleep'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { AppStackNavigation } from './AppStackNavigation'

type LoginStatusTypes = 'BeforeCheck' | 'LoggedIn' | 'AnotherVisit' | 'FirstVisit'

export const AppNavigation = () => {
  const { user } = useUserContext()
  const { fetchUser } = useUserData()
  const [loginStatus, setLoginStatus] = React.useState<LoginStatusTypes>('BeforeCheck')

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isUsername = await AsyncStorage.getItem('firstName')
      if (user) return setLoginStatus('LoggedIn')
      SplashScreen.hide()
      await sleep(3500)

      const authToken = await getItemAsync('token')
      if (authToken) {
        authorizeClient(authToken)
        fetchUser()
      }
      const isAnotherVisit = await getItemAsync('hideSlider')
      if (isAnotherVisit) return setLoginStatus('AnotherVisit')
      return setLoginStatus('FirstVisit')
    }
    checkLoginStatus()
  }, [fetchUser, user])

  return (
    <NavigationContainer linking={linking}>
      {loginStatus === 'BeforeCheck' && <Splash />}
      {loginStatus === 'LoggedIn' && <AppStackNavigation />}
      {loginStatus === 'FirstVisit' && <AuthStackNavigation />}
      {loginStatus === 'AnotherVisit' && <AuthStackNavigation initialRoute="Welcome" />}
    </NavigationContainer>
  )
}
