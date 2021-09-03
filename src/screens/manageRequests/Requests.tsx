import React, { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AppNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { FilterBox } from 'components/FilterBox'
import { ModalProvider } from 'contexts/ModalProvider'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useOrganizationRequests } from 'hooks/useOrganizationRequests'
import { useRequestActions } from 'hooks/useRequestActions'
import { RequestsList } from './components/RequestsList'
import { REQUEST_STATUS } from './helpers'

const requests = [
  {
    description: 'Wedding time off',
    message: 'Hello, My sister is getting married in another country. I would like to attend.',
    id: 'ifjesiefbbsnfsm',
    sickTime: true,
    status: 'PENDING',
    range: ['20/04/2000'],
    user: {
      firstName: 'User',
      lastName: 'SurnameUser',
      occupation: 'GOD',
      email: 'user@email.com',
    },
  },
  {
    description: 'Sick time please',
    message: '',
    id: 'ifjegfgdgdgdgdsiefbbsnfsm',
    sickTime: true,
    status: 'ACCEPTED',
    range: ['20/04/2000', '21/12/2000'],
    user: {
      firstName: 'User',
      lastName: 'UserSurnameeee',
      occupation: 'GOD1',
      email: 'user@email.com',
    },
  },
  {
    description: 'Anniversary trip',
    message: '',
    id: 'ifjegdgdgdgdsiefbbsnfsm',
    sickTime: true,
    status: 'REJECTED',
    range: ['20/04/2000'],
    user: {
      firstName: 'User3',
      lastName: '',
      occupation: 'GOD2',
      email: 'user@email.com',
    },
  },
]
export const Requests = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { isSuccessApprove } = useRequestActions()
  const { t } = useTranslation('adminPanel')
  const { setFilter, refetch } = useOrganizationRequests()

  const pendingRequests = requests?.filter(
    (request) => request.status.toUpperCase() === REQUEST_STATUS.PENDING
  )
  const acceptedRequests = requests?.filter(
    (request) => request.status.toUpperCase() === REQUEST_STATUS.ACCEPTED
  )
  const rejectedRequests = requests?.filter(
    (request) => request.status.toUpperCase() === REQUEST_STATUS.REJECTED
  )

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  useEffect(() => {
    setFilter('ALL')
  }, [setFilter])

  useEffect(() => {
    if (isSuccessApprove) refetch()
  }, [isSuccessApprove, refetch])

  return (
    <ModalProvider>
      <SafeAreaWrapper>
        <DrawerBackArrow goBack={handleGoBack} title={t('requests')} />
        <FilterBox onSearch={() => {}} onFilter={() => {}} />
        <Box marginHorizontal="m" flex={1}>
          <Text variant="lightGreyRegular">{t('requests').toUpperCase()}</Text>
          {requests && <RequestsList requests={requests} />}
        </Box>
      </SafeAreaWrapper>
    </ModalProvider>
  )
}
