import { TertiaryButton } from 'components/TertiaryButton'
import React from 'react'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'

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
  <Box paddingTop="l">
    <FlatList
      horizontal
      data={filterCategories}
      renderItem={({ item }) => (
        <TertiaryButton
          teamName={item.title}
          isSelected={item.isSelected}
          onPress={() => toggleFilterItemSelection(item.id)}
        />
      )}
      ListHeaderComponent={() => <Box width={16} />}
      ListFooterComponent={() => <Box width={16} />}
      keyExtractor={({ id }) => id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  </Box>
)
