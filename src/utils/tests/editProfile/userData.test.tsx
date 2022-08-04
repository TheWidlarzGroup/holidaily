import React from 'react'
import { render } from '@testing-library/react-native'
import { MockedNavigator } from 'utils/tests/MockedNavigator'
import { MockGlobalProviders } from 'utils/tests/MockGlobalProviders'
import { Box } from 'utils/theme'
import IconEdit from 'assets/icons/icon-edit.svg'

const Comp = () => (
  <Box>
    <IconEdit />
  </Box>
)

describe('test user edit inputs', () => {
  const navigationSpy = jest.fn()
  const renderEditProfile = render(
    <MockedNavigator stateChangeSpy={navigationSpy} component={Comp} />,
    { wrapper: MockGlobalProviders }
  )
  // const { t } = useTranslation('userProfile')

  // it('should show confirm modal when user data is changed', () => {})
  it('should show confirm modal when user data is changed', () => {
    // const saveChangesBtn = renderEditProfile.getByText(t('userTeams'))
  })
})
