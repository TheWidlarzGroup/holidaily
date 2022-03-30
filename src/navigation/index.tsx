import React, { useEffect, useRef } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { Splash } from 'screens/splash/Splash'
import { sleep } from 'utils/sleep'
import { PostTempUserBody, useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { AppStackNavigation } from './AppStackNavigation'

type LoginStatusTypes = 'BeforeCheck' | 'LoggedIn' | 'AnotherVisit' | 'FirstVisit'

export const AppNavigation = () => {
  const { user, updateUser } = useUserContext()
  const { mutate: createTempUser, isSuccess: isTempUserCreated } = useCreateTempUser()
  const [loginStatus, setLoginStatus] = React.useState<LoginStatusTypes>('BeforeCheck')
  const isFirstRender = useRef(true)
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    if (isFirstRender.current) return
    if (loginStatus === 'LoggedIn' && !user) setLoginStatus('FirstVisit')
  }, [user, loginStatus])

  useEffect(() => {
    const checkLoginStatus = async () => {
      const [firstName, lastName, occupation] = await Promise.all([
        AsyncStorage.getItem('firstName'),
        AsyncStorage.getItem('lastName'),
        AsyncStorage.getItem('occupation'),
      ])
      if (isFirstRender.current) {
        isFirstRender.current = false
        await sleep(3500)
      }
      if (isTempUserCreated) return setLoginStatus('LoggedIn')
      if (firstName) {
        const userData: PostTempUserBody = { firstName }
        if (lastName) userData.lastName = lastName
        if (occupation) userData.occupation = occupation
        createTempUser(userData, { onSuccess: (data) => updateUser(data.user) })
      } else return setLoginStatus('FirstVisit')
    }
    checkLoginStatus()
  }, [updateUser, isTempUserCreated, createTempUser])

  return (
    <NavigationContainer linking={linking}>
      {loginStatus === 'BeforeCheck' && <Splash />}
      {loginStatus === 'LoggedIn' && <AppStackNavigation />}
      {loginStatus === 'FirstVisit' && <AuthStackNavigation />}
      {loginStatus === 'AnotherVisit' && <AuthStackNavigation initialRoute="Welcome" />}
    </NavigationContainer>
  )
}
