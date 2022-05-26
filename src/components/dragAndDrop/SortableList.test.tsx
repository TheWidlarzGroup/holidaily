import React from 'react'
import { makeOrder, orderToPositions } from './SortableList'

// Comment: Tests throw "Can not find module react-native-reanimated from Item.tsx"
describe.skip('makeOrder util', () => {
  it('Should return order of children ids', () => {
    // eslint-disable-next-line
    const ComponentWithId = ({ id }: { id: number | string }) => null
    const children = [
      <ComponentWithId id="test1" />,
      <ComponentWithId id="test2" />,
      <ComponentWithId id="foo-bar" />,
    ]
    expect(makeOrder(children, {})).toEqual(['test1', 'test2', 'foo-bar'])
    expect(makeOrder(children, { test2: 0, 'foo-bar': 1 })).toEqual(['test2', 'foo-bar', 'test1'])
    expect(makeOrder(children, { test2: 0, 'foo-bar': 1, 'im-not-in-this-team': 2 })).toEqual([
      'test2',
      'foo-bar',
      'test1',
    ])
  })
})
describe.skip('orderToPositions', () => {
  it('should create positions object', () => {
    const order = ['foo', 'baz', 'bar']
    expect(orderToPositions(order)).toEqual({ foo: 0, baz: 1, bar: 2 })
  })
})
