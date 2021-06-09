import React, { FC, useState } from 'react'

import { Box } from 'utils/theme'
import { FlatList, ScrollView } from 'react-native'
import { SliderItem } from 'screens/calendar/SliderItem'

const MOCKED_DATA = [
  { id: 1, title: 'Akademia', isSelected: true },
  { id: 2, title: 'SmartSoft', isSelected: true },
  { id: 3, title: 'Devs', isSelected: false },
  { id: 4, title: 'Company', isSelected: false },
  { id: 5, title: 'Designers', isSelected: false },
]

export const Calendar: FC = () => {
  const [data, setData] = useState(MOCKED_DATA)

  const toggleItemSelection = (id: number) => {
    setData((prevState) => {
      const newState = [...prevState]
      const index = newState.findIndex((item) => item.id === id)
      newState[index].isSelected = !prevState[index].isSelected
      return newState
    })
  }

  return (
    <ScrollView>
      <Box marginTop="l">
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => (
            <SliderItem {...item} toggleItemSelection={() => toggleItemSelection(item.id)} />
          )}
          ListHeaderComponent={() => <Box width={8} />}
          ListFooterComponent={() => <Box width={8} />}
          keyExtractor={({ id }) => id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </ScrollView>
  )
}
