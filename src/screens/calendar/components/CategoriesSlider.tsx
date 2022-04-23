import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Box } from 'utils/theme'
import { SliderItem } from './SliderItem'

export type FilterCategory = {
  id: number
  title: string
  isSelected: boolean
}
type CategoriesSliderProps = {
  filterCategories: FilterCategory[]
  toggleFilterItemSelection: F1<number>
}

export const CategoriesSlider = ({
  filterCategories,
  toggleFilterItemSelection,
}: CategoriesSliderProps) => (
  <Box paddingTop={'l'}>
    <FlatList
      horizontal
      data={filterCategories}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={1}>
          <SliderItem {...item} toggleItemSelection={() => toggleFilterItemSelection(item.id)} />
        </TouchableOpacity>
      )}
      ListHeaderComponent={() => <Box width={8} />}
      ListFooterComponent={() => <Box width={8} />}
      keyExtractor={({ id }) => id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  </Box>
)
