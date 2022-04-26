import React, { useEffect } from 'react'

import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { TeamElement } from 'screens/dashboard/components/TeamElement'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { SortableList } from 'screens/dashboard/dragAndDrop/SortableList'
import { Team, User } from 'mock-api/models/mirageTypes'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import { useModalContext } from 'contexts/ModalProvider'
import Modal from 'react-native-modal'
import { DashboardTeamMember } from './DashboardTeamMember'

export const Dashboard = () => {
  const { showModal, hideModal } = useModalContext()
  const openModal = (user: User) => showModal(<UserModal hideModal={hideModal} modalUser={user} />)
  const { user } = useUserContext()

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal: openModal })
  if (!user?.teams) return <LoadingModal show />
  return (
    <>
      <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
        <DashboardHeader />
        <SortableList openUserModal={openModal}>
          {(user.teams ?? []).map((team: Team) => (
            <TeamElement
              {...team}
              key={team.name}
              navigateToTeamScreen={() => navigateToTeamDetails(team)}
            />
          ))}
        </SortableList>
      </SafeAreaWrapper>
    </>
  )
}
const USER_MODAL_ANIM_TIME = 300
const UserModal = ({ hideModal, modalUser }: { hideModal: F0; modalUser: User }) => {
  const [isVisible, { setFalse: fadeOut }] = useBooleanState(true)
  useEffect(() => {
    let timeout: number
    if (!isVisible) timeout = setTimeout(hideModal, USER_MODAL_ANIM_TIME + 20)
    return () => clearTimeout(timeout)
  }, [isVisible, hideModal])
  return (
    <Modal
      statusBarTranslucent
      swipeThreshold={20}
      isVisible={isVisible}
      hasBackdrop
      backdropColor="black"
      backdropOpacity={0.6}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ margin: 0, marginTop: 120 }}
      animationInTiming={USER_MODAL_ANIM_TIME}
      animationOutTiming={USER_MODAL_ANIM_TIME}
      onSwipeComplete={fadeOut}
      onBackButtonPress={fadeOut}
      onBackdropPress={fadeOut}>
      <DashboardTeamMember closeModal={fadeOut} user={modalUser} />
    </Modal>
  )
}
