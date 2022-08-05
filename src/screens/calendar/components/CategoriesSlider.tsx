import { ConfirmationModal } from 'components/ConfirmationModal'
import { TertiaryButton } from 'components/TertiaryButton'
import { useBooleanState } from 'hooks/useBooleanState'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'
import { FilterCategory } from '../useTeamCategories'

type Props = {
  filterCategories: FilterCategory[] | null
  toggleFilterItemSelection: F1<number>
}

export const CategoriesSlider = (props: Props) => {
  const { t } = useTranslation('calendar')

  const [isWarningModalOpen, { setTrue: openWarningModal, setFalse: closeWarningModal }] =
    useBooleanState(false)

  const handleToggleSelection = (id: number) => {
    const selectedTeams = (props?.filterCategories || []).filter((team) => team?.isSelected)
    const isSelected = (props?.filterCategories || []).find((cat) => cat?.id === id)?.isSelected

    if (selectedTeams.length === 1 && isSelected) return openWarningModal()
    props.toggleFilterItemSelection(id)
  }

  return (
    <Box paddingTop="l" marginLeft="-s">
      <FlatList
        horizontal
        data={props?.filterCategories}
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
