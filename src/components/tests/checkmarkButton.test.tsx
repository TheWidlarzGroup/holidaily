import React from 'react'
import {
  withReanimatedTimer,
  advanceAnimationByTime,
} from 'react-native-reanimated/src/reanimated2/jestUtils'
import { act } from 'react-test-renderer'
import { render, fireEvent } from '../../../jest/util'
import { CheckmarkButton } from '../CheckmarkButton'

test('Button fire callback after animation finished', () => {
  withReanimatedTimer(() => {
    const label = 'test'
    const style = { width: 84 }

    const mockFn = jest.fn()

    const { getByTestId, getByText } = render(
      <CheckmarkButton label={label} onFinish={mockFn} variant="secondary" />
    )
    const container = getByTestId('buttonContainer')
    act(() => {
      expect(mockFn).not.toBeCalled()
      fireEvent.press(getByText(label))
      advanceAnimationByTime(1000)
      // @ts-ignore
      expect(container).toHaveAnimatedStyle(style)
      expect(mockFn).toBeCalled()
    })
  })
})
