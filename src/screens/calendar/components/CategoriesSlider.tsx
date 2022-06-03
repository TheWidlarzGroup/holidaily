import { ConfirmationModal } from 'components/ConfirmationModal'
import { TertiaryButton } from 'components/TertiaryButton'
import { useBooleanState } from 'hooks/useBooleanState'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
}: CategoriesSliderProps) => {
  const { t } = useTranslation('calendar')
  const [isWarningModalOpen, { setTrue: openWarningModal, setFalse: closeWarningModal }] =
    useBooleanState(false)

  const handleToggleSelection = (id: number) => {
    const selectedTeams = filterCategories.filter((team) => team.isSelected)
    const isSelected = filterCategories.find((cat) => cat.id === id)?.isSelected
    if (selectedTeams.length === 1 && isSelected) return openWarningModal()
    toggleFilterItemSelection(id)
  }

  return (
    <Box paddingTop="l">
      <FlatList
        horizontal
        data={filterCategories}
        renderItem={({ item }) => (
          <TertiaryButton
            teamName={item.title}
            isSelected={item.isSelected}
            onPress={() => handleToggleSelection(item.id)}
          />
        )}
        ListHeaderComponent={() => <Box width={16} />}
        ListFooterComponent={() => <Box width={16} />}
        keyExtractor={({ id }) => id.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <ConfirmationModal
        isVisible={isWarningModalOpen}
        header={t('cantDeselect')}
        content={t('calendarPurpose')}
        acceptBtnText={t('gotIt')}
        onAccept={() => closeWarningModal()}
        statusIcon="error"
        hideRejectButton
        hideModal={closeWarningModal}
        onDecline={closeWarningModal}
      />
    </Box>
  )
}
