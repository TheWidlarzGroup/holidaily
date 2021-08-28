import { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'
import { useUserContext } from './useUserContext'
import { useUserIdAuthHash } from './useUserIdAuthHash'

export const useOneSignalExternalUserId = () => {
  const { data, mutate } = useUserIdAuthHash()
  const { user } = useUserContext()

  const handleRes = (res: unknown) => {
    console.log(res)
  }

  const logout = () => {
    OneSignal.setExternalUserId('', data.userIdAuthHash, handleRes)
  }

  const subscribe = (userId: string) =>
    mutate().then((res) => {
      const userIdAuthHash = res?.data?.userIdAuthHash
      console.log([userId, userIdAuthHash])
      OneSignal.setExternalUserId(userId, userIdAuthHash, handleRes)
    })

  useEffect(() => {
    if (!user?.id) logout()
    else subscribe(user.id)
  }, [user, user?.id, logout, subscribe])
}
