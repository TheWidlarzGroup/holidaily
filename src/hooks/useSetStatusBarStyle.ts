import { useEffect } from 'react'
import { StatusBar } from 'react-native'

type UseSetStatusBarStyleProps = {
  darkMode?: boolean
}

export const useSetStatusBarStyle = (props: UseSetStatusBarStyleProps | null) => {
  useEffect(() => {
    const statusBarStyle = props?.darkMode === false ? 'dark-content' : 'light-content'
    StatusBar.setBarStyle(statusBarStyle)
  }, [props])
}
