import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import { mkUseStyles, Theme } from 'utils/theme'
import SplashScreen from 'react-native-splash-screen'
import { Splash } from 'screens/splash/Splash'
import { sleep } from 'utils/sleep'
import { getItem } from 'utils/localStorage'
import { PostTempUserBody, useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { useInitDemoUserTeams } from 'hooks/useInitDemoUserTeams'
import { UserSettingsContext } from 'contexts/UserSettingsContext'
import { Analytics } from 'services/analytics'
import { currentRouteConverter } from 'utils/currentRouteConverter'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { AppStackNavigation } from './AppStackNavigation'

type LoginStatusTypes = 'BeforeCheck' | 'LoggedIn' | 'LoggedOut' | 'FirstVisit'

export const AppNavigation = () => {
  const styles = useStyle()
  const userSettingsContext = useContext(UserSettingsContext)
  const isDarkTheme = !!userSettingsContext?.userSettings?.darkMode

  const navigationRef: any = useRef()
  const routeNameRef: any = useRef()
  // TODO: Any ideas how to fix types above?

  const { user, updateUser } = useUserContext()
  const { mutate: createTempUser, isSuccess: isTempUserCreated } = useCreateTempUser()
  const [loginStatus, setLoginStatus] = React.useState<LoginStatusTypes>('BeforeCheck')
  const isFirstRender = useRef(true)
  const initTeams = useInitDemoUserTeams()
  useEffect(() => {
    initTeams()
  }, [initTeams])
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
    if (loginStatus === 'LoggedIn' && !user) return setLoginStatus('LoggedOut')
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

  const navigatorTheme = {
    dark: isDarkTheme,
    colors: {
      primary: styles.navigatorColors.primaryColor,
      background: styles.navigatorColors.backgroundColor,
      card: styles.navigatorColors.cardColor,
      text: styles.navigatorColors.textColor,
      border: styles.navigatorColors.borderColor,
      notification: styles.navigatorColors.notificationColor,
    },
  }

  return (
    <NavigationContainer
      linking={linking}
      theme={navigatorTheme}
      ref={navigationRef}
      onReady={() => {
        if (routeNameRef) {
          routeNameRef.current = navigationRef.current.getCurrentRoute()
        }
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.current.getCurrentRoute()
        if (previousRouteName !== currentRouteName && currentRouteName) {
          const currentRoute = currentRouteConverter(currentRouteName.name)
          Analytics().track(currentRoute)
        }
        routeNameRef.current = currentRouteName
      }}>
      {loginStatus === 'BeforeCheck' && <Splash />}
      {loginStatus === 'LoggedIn' && <AppStackNavigation />}
      {loginStatus === 'FirstVisit' && <AuthStackNavigation />}
      {loginStatus === 'LoggedOut' && <AuthStackNavigation initialRoute="Welcome" userLoggedOut />}
    </NavigationContainer>
  )
}

const useStyle = mkUseStyles((theme: Theme) => ({
  navigatorColors: {
    primaryColor: theme.colors.primary,
    cardColor: theme.colors.primary,
    textColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    notificationColor: theme.colors.primary,
    // COMMENT: colors above are used due to the TS demandings but they are not changing the UI
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
