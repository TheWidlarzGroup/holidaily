import React from 'react'
import { FlatList } from 'react-native'
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
  <Box>
    <FlatList
      horizontal
      data={filterCategories}
      renderItem={({ item }) => (
        <SliderItem {...item} toggleItemSelection={() => toggleFilterItemSelection(item.id)} />
      )}
      ListHeaderComponent={() => <Box width={8} />}
      ListFooterComponent={() => <Box width={8} />}
      keyExtractor={({ id }) => id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  </Box>
)
