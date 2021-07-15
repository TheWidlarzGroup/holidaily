import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { TextLink } from '../TextLink'

test('Button fire callback', () => {
  const label = 'test'
  const mockFn = jest.fn()

  const { getByText } = render(<TextLink text={label} action={mockFn} variant="body1" />)

  fireEvent.press(getByText(label))

  expect(mockFn).toBeCalled()
})
