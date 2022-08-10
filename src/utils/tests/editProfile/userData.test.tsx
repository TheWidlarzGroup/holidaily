import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { MockedNavigator } from 'utils/tests/MockedNavigator'
import { MockGlobalProviders } from 'utils/tests/MockGlobalProviders'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { useTranslation } from 'react-i18next'

describe('test user edit inputs', () => {
  const { t } = useTranslation('userProfile')
  const navigationSpy = jest.fn()
  render(<MockedNavigator stateChangeSpy={navigationSpy} component={EditProfile} />, {
    wrapper: MockGlobalProviders,
  })

  // it('should show confirm modal when user data is changed', () => {})

  it('should show confirm modal when user data is changed', () => {
    screen.getByText(t('userFirstName'))
    const firstNameInput = screen.getByPlaceholderText(t('firstNamePlaceholder'))

    fireEvent.changeText(firstNameInput, 'Jan')
    const modalSaveButton = screen.getByText(t('saveChanges'))
    fireEvent.press(modalSaveButton)
    fireEvent.changeText(firstNameInput, 'Luk')
    const modalDiscardButton = screen.getByText(t('discardChanges'))
    fireEvent.press(modalDiscardButton)
    // expect(firstNameInput.value).toBe('Luk')
    expect(firstNameInput).toHaveLength(3)
  })
})
