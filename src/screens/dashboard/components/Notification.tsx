import React, { useState, useEffect } from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { Notification as NotificationModel, User } from 'mockApi/models'
import { formatDate } from 'utils/formatDate'
import { useNavigation } from '@react-navigation/native'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { NotificationContent } from './NotificationContent'
import { notificationNavHandler } from '../helpers/notificationNavHandler'
import { NotificationThumbnail } from './NotificationThumbnail'
import { TeamMemberModal } from '../DashboardTeam'

export const Notification = ({
  source: author,
  wasSeenByHolder,
  type,
  ...p
}: NotificationModel) => {
  const defaultOpacity = wasSeenByHolder ? 0.6 : 1
  const [opacity, setOpacity] = useState(defaultOpacity)
  const endDate = 'endDate' in p ? new Date(p.endDate) : undefined
  const description = 'description' in p ? p.description : undefined
  const { user } = useUserContext()
  const { navigate } = useNavigation()
  const { mutate } = useMarkNotificationAsSeen()

  useEffect(() => {
    setOpacity(wasSeenByHolder ? 0.6 : 1)
  }, [wasSeenByHolder])

  // Comment: handle user timeOff type
  const { allUsers } = useTeamsContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()

  const openModal = () => {
    // TO-DO: first and last name are used for mocks - with BE change for user id
    const userModalData = allUsers.find(
      (userData) => userData.firstName === author.firstName && userData.lastName === author.lastName
    )
    if (userModalData?.id !== modalUser?.id) {
      setModalUser(userModalData)
    }
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    if (!wasSeenByHolder) mutate({ id: p.id })
  }

  const notificationRequest = p.requestId
    ? user?.requests.find((item) => item.id === p.requestId)
    : undefined

  const onPress = () => {
    if (type === 'dayOff') openModal()
    if (type !== 'dayOff') {
      if (!wasSeenByHolder) mutate({ id: p.id })
      notificationNavHandler(navigate, type, notificationRequest)
    }
  }

  return (
    <Box
      backgroundColor="lightGrey"
      borderRadius="lmin"
      marginVertical="s"
      marginTop="none"
      height={88}
      overflow="hidden">
      <BaseOpacity
        activeOpacity={defaultOpacity}
        onPress={onPress}
        opacity={opacity}
        flexDirection="row">
        <NotificationThumbnail author={author} type={type} />
        <Box flex={1}>
          <NotificationContent
            endDate={endDate}
            type={type}
            description={description}
            firstName={author.firstName}
            lastName={author.lastName}
            isSeen={wasSeenByHolder}
          />
          <Box marginBottom="s" marginRight="m" alignSelf="flex-end">
            <Text variant="textXS" color="darkGreyBrighter">
              {formatDate(new Date(p.createdAt), 'ago')}
            </Text>
          </Box>
        </Box>
      </BaseOpacity>
      {modalUser && (
        <TeamMemberModal onHide={closeModal} isOpen={isModalVisible} modalUser={modalUser} />
      )}
    </Box>
  )
}

export default React.memo(Notification)
