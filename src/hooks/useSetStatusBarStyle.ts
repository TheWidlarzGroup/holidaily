import { useEffect } from 'react'
import { StatusBar } from 'react-native'

type UseSetStatusBarStyleProps = {
  darkMode: boolean | undefined
}

export const useSetStatusBarStyle = (props: UseSetStatusBarStyleProps | null) => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      const statusBarStyle = props?.darkMode ? 'light-content' : 'dark-content'
      StatusBar.setBarStyle(statusBarStyle)
    }
  }, [props])
}
