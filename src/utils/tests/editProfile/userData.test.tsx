import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { MockedNavigator } from 'utils/tests/MockedNavigator'
import { MockGlobalProviders } from 'utils/tests/MockGlobalProviders'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { useTranslation } from 'react-i18next'

describe('test user edit inputs', () => {
  const { t } = useTranslation('userProfile')
  const navigationSpy = jest.fn()

  it('should show confirm modal when user first name is changed', () => {
    const screen = render(
      <MockedNavigator stateChangeSpy={navigationSpy} component={EditProfile} />,
      {
        wrapper: MockGlobalProviders,
      }
    )

    const firstNameInput = screen.getByPlaceholderText(t('firstNamePlaceholder'))
    fireEvent.changeText(firstNameInput, 'John')
    expect(firstNameInput.props.value).toBe('John')

    const modalSaveButton = screen.getByText(t('saveChanges'))
    fireEvent.press(modalSaveButton)

    fireEvent.changeText(firstNameInput, 'Rob')

    const modalDiscardButton = screen.getByText(t('discardChanges'))
    fireEvent.press(modalDiscardButton)

    expect(firstNameInput.props.value).not.toBe('John')
  })

  it('should show confirm modal when user last name is changed', () => {
    const screen = render(
      <MockedNavigator stateChangeSpy={navigationSpy} component={EditProfile} />,
      {
        wrapper: MockGlobalProviders,
      }
    )

    const lastNameInput = screen.getByPlaceholderText(t('lastNamePlaceholder'))
    fireEvent.changeText(lastNameInput, 'Smith')
    expect(lastNameInput.props.value).toBe('Smith')

    const modalSaveButton = screen.getByText(t('saveChanges'))
    fireEvent.press(modalSaveButton)

    fireEvent.changeText(lastNameInput, 'John')

    const modalDiscardButton = screen.getByText(t('discardChanges'))
    fireEvent.press(modalDiscardButton)

    expect(lastNameInput.props.value).not.toBe('Smith')
  })
})
