import React, { useCallback, useEffect, useRef } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { Splash } from 'screens/splash/Splash'
import { sleep } from 'utils/sleep'
import { getItem } from 'utils/localStorage'
import { PostTempUserBody, useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { AppStackNavigation } from './AppStackNavigation'

type LoginStatusTypes = 'BeforeCheck' | 'LoggedIn' | 'AnotherVisit' | 'FirstVisit'

export const AppNavigation = () => {
  const { user, updateUser } = useUserContext()
  const { mutate: createTempUser, isSuccess: isTempUserCreated } = useCreateTempUser()
  const { data: organization, isLoading: isOrgLoading } = useGetOrganization()
  const [loginStatus, setLoginStatus] = React.useState<LoginStatusTypes>('BeforeCheck')
  const isFirstRender = useRef(true)
  const idRef = useRef(user?.id)
  useEffect(() => {
    // add organization teams to user teams property
    if (user && isTempUserCreated && !isOrgLoading && organization?.teams) {
      // if idRef contains user.id than we already have updated the user teams
      if (user.id === idRef.current) return
      idRef.current = user.id
      updateUser({
        teams: organization.teams.slice(0, -2),
      })
    }
  }, [isOrgLoading, organization, isTempUserCreated, updateUser, user])
  const init = useCallback(
    async () =>
      Promise.all([
        getItem('firstName'),
        getItem('lastName'),
        getItem('occupation'),
        getItem('photo'),
        getItem('userColor'),
      ]),
    []
  )
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    if (isFirstRender.current) return
    if (loginStatus === 'LoggedIn' && !user) return setLoginStatus('FirstVisit')
    if (user?.firstName && loginStatus !== 'LoggedIn') setLoginStatus('LoggedIn')
  }, [user, loginStatus])

  useEffect(() => {
    const checkLoginStatus = async () => {
      const [firstName, lastName, occupation, photo, userColor] = await init()
      if (isFirstRender.current) {
        isFirstRender.current = false
        await sleep(1500)
      }
      if (isTempUserCreated) return setLoginStatus('LoggedIn')
      if (firstName) {
        const userData: PostTempUserBody = { firstName }
        if (lastName) userData.lastName = lastName
        if (occupation) userData.occupation = occupation
        if (photo) userData.photo = photo
        if (userColor) userData.userColor = userColor
        createTempUser(userData, { onSuccess: (data) => updateUser(data.user) })
      } else return setLoginStatus('FirstVisit')
    }
    checkLoginStatus()
  }, [updateUser, isTempUserCreated, createTempUser, init])

  return (
    <NavigationContainer linking={linking}>
      {loginStatus === 'BeforeCheck' && <Splash />}
      {loginStatus === 'LoggedIn' && <AppStackNavigation />}
      {loginStatus === 'FirstVisit' && <AuthStackNavigation />}
      {loginStatus === 'AnotherVisit' && <AuthStackNavigation initialRoute="Welcome" />}
    </NavigationContainer>
  )
}
