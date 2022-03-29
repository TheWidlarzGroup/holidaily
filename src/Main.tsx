import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryKeys } from 'reactQuery/QueryKeys'
import { getOrganization } from 'reactQuery/queries/useOrganizationQuery'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()
export const queryClient = new QueryClient()

export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false

  queryClient.prefetchQuery(QueryKeys.ORGANIZATION, getOrganization)

  useEffect(() => {
    const checkIfMockWorks = async () => {
      try {
        const {
          data: { user },
        } = await axios.post('api/users', { firstName: 'John', lastName: 'Doe' })
        axios.defaults.headers.common.userId = user.id
        // console.log(user)
        // const { data } = await axios.get(`api/requests/${user.id}`)
        await axios.post('api/request', {
          isSickTime: true,
          description: 'test',
          message: 'tsest',
          endDate: new Date(),
          startDate: new Date(),
        })
        // const { data } = await axios.get('api/organization')
        // console.log(data.organizations[0].teams[0].users[0])
      } catch (error) {
        console.error(error.response.headers)
      }
    }
    checkIfMockWorks()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <UserContextProvider>
                <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
                <AppNavigation />
              </UserContextProvider>
            </QueryClientProvider>
          </ModalProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
