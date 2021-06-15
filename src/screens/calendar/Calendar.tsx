import React, { FC, useState } from 'react'

import { Box, theme } from 'utils/theme'
import { FlatList, SafeAreaView, ScrollView } from 'react-native'
import { SliderItem } from 'screens/calendar/SliderItem'
import { Calendar as CalendarComponent } from 'components/Calendar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

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
    <SafeAreaWrapper isDefaultBgColor>
      <ScrollView>
        <Box>
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
          <Box
            borderRadius="m"
            backgroundColor="white"
            marginTop="m"
            style={{
              borderRadius: 16,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: theme.colors.black,
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 10,
              borderWidth: 0,
            }}>
            <CalendarComponent
              theme={{
                calendarBackground: 'transparent',
              }}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  )
}
