import React from 'react'
import { render } from '@testing-library/react-native'
import { MockedNavigator } from 'utils/tests/MockedNavigator'
import { MockGlobalProviders } from 'utils/tests/MockGlobalProviders'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { useTranslation } from 'react-i18next'

describe('test user edit inputs', () => {
  const { t } = useTranslation('userProfile')
  const navigationSpy = jest.fn()
  const renderEditProfile = render(
    <MockedNavigator stateChangeSpy={navigationSpy} component={EditProfile} />,
    { wrapper: MockGlobalProviders }
  )

  // it('should show confirm modal when user data is changed', () => {})

  it('should show confirm modal when user data is changed', () => {
    const saveChangesBtn = renderEditProfile.getByText(t('userFirstName'))
  })
})
