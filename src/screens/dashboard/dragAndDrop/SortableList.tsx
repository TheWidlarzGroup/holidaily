import React, { ReactElement } from 'react'
import { ScrollView } from 'react-native'
import { Item } from 'screens/dashboard/dragAndDrop/Item'
import { useSharedValue } from 'react-native-reanimated'
import { COL, Positions, SIZE } from './Config'

type SortableListProps = {
  children: ReactElement<{ id: number }>[]
}

export const SortableList = ({ children }: SortableListProps) => {
  const positions = useSharedValue<Positions>(
    Object.assign({}, ...children.map((child, index) => ({ [child.props.id]: index })))
  )
  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}>
      {children.map((child) => (
        <Item key={child.props.id} positions={positions} id={child.props.id}>
          {child}
        </Item>
      ))}
    </ScrollView>
  )
}
