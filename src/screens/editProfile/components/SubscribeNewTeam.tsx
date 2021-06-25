import React, { FC, useEffect, useState, useCallback } from 'react'
import { StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { CustomButton } from 'components/CustomButton'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useModalContext } from 'contexts/ModalProvider'
import { UserProfileNavigationProps } from 'navigation/types'
import { Box, Text, theme, mkUseStyles, Theme } from 'utils/theme'
import { TEAMS, TeamsType } from 'utils/mocks/teamsMocks'
import IconBack from 'assets/icons/icon-back.svg'
import IconSearch from 'assets/icons/icon-search.svg'
import { useUserDetailsContext } from '../helpers/UserDetailsContext'

type SubscribeNewTeamProps = UserProfileNavigationProps<'SubscribeTeam'>

export const SubscribeNewTeam: FC<SubscribeNewTeamProps> = () => {
  const styles = useStyles()
  const { handleModal } = useModalContext()
  const { goBack } = useNavigation()
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [masterData, setMasterData] = useState<TeamsType[]>([])
  const [filteredTeams, setFilteredTeams] = useState<TeamsType[]>([])
  const [subscribedTeams, setSubscribedTeams] = useState<TeamsType[]>([])
  const { userTeams, setUserTeams } = useUserDetailsContext()

  const filterAlreadySubmittedSubscriptions = useCallback(() => {
    const teamsAvailableToSubscribe = TEAMS.filter(
      ({ teamName }) => !userTeams.some((userTeam) => userTeam.teamName === teamName)
    )
    setMasterData(teamsAvailableToSubscribe)
    setFilteredTeams(teamsAvailableToSubscribe)
  }, [userTeams])

  const checkTeamsAvailableToSubscribe = (subscriptions: TeamsType[]): TeamsType[] =>
    masterData.filter(
      (masterTeam) => !subscriptions.some(({ teamName }) => teamName === masterTeam.teamName)
    )

  const searchFilter = (text: string) => {
    setSearchPhrase(text)
    if (text) {
      const filteredItems = filteredTeams.filter(({ teamName }) =>
        teamName.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredTeams(filteredItems)
    } else {
      setFilteredTeams(checkTeamsAvailableToSubscribe(subscribedTeams))
    }
  }

  const addToSubscriptions = ({ teamName, id }: TeamsType) => {
    const subscriptions = [...subscribedTeams, { teamName, id }]
    setFilteredTeams(checkTeamsAvailableToSubscribe(subscriptions))
    setSubscribedTeams(subscriptions)
  }

  const removeFromSubscriptions = (teamName: string) => {
    const subscriptions = subscribedTeams.filter((item) => item.teamName !== teamName)
    setSubscribedTeams(subscriptions)
    setFilteredTeams(checkTeamsAvailableToSubscribe(subscriptions))
  }

  const confirmationMessage = () => {
    const teamNames = subscribedTeams.map(({ teamName }) => teamName).join(' and ')
    return `${teamNames} subscribed!`
  }

  const submitSubscriptions = () => {
    setUserTeams([...subscribedTeams, ...userTeams])
    handleModal(
      <ChangesSavedModal
        isVisible
        content={confirmationMessage()}
        hideModal={() => handleModal()}
      />
    )
    goBack()
  }

  useEffect(() => {
    if (TEAMS) filterAlreadySubmittedSubscriptions()
  }, [filterAlreadySubmittedSubscriptions])

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.modalBackdrop)
    return () => StatusBar.setBackgroundColor('white')
  }, [])

  const handleGoBack = () => {
    if (subscribedTeams.length > 0) {
      handleModal(
        <ConfirmationModal
          isVisible
          hideModal={() => handleModal()}
          onAccept={() => {
            setSubscribedTeams([])
            setFilteredTeams(masterData)
            handleModal()
            goBack()
          }}
          onDecline={() => {
            handleModal()
          }}
          content={"If you quit now, your changes won't be saved"}
        />
      )
    } else {
      goBack()
    }
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} backgroundColor="modalBackdrop">
        <Box
          flex={1}
          backgroundColor="disabledText"
          marginTop="xm"
          borderTopRightRadius="lmin"
          borderTopLeftRadius="lmin"
          padding="l"
          style={styles.shadow}>
          <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack} style={styles.backBtn}>
            <IconBack />
          </TouchableOpacity>
          <Text variant="boldBlackCenter20">{'Subscribe more teams'}</Text>
          <Box position="relative" marginTop="lplus" marginBottom="xxl">
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => searchFilter(text)}
              value={searchPhrase}
            />
            <IconSearch style={styles.searchIcon} />
          </Box>
          <Box flexDirection="row" flexWrap="wrap">
            {subscribedTeams.map(({ teamName, id }) => (
              <RectButton
                key={id}
                style={styles.subscribedTeam}
                onPress={() => removeFromSubscriptions(teamName)}>
                <Text variant="resendWhite">{teamName}</Text>
              </RectButton>
            ))}
          </Box>
          <ScrollView>
            <Box flexDirection="row" flexWrap="wrap">
              {filteredTeams.map(({ teamName, id }) => (
                <RectButton
                  key={id}
                  style={styles.teamItem}
                  onPress={() => addToSubscriptions({ teamName, id })}>
                  <Text variant="bold15">{teamName}</Text>
                </RectButton>
              ))}
            </Box>
          </ScrollView>
          {subscribedTeams.length > 0 && (
            <Box position="absolute" bottom={16} alignSelf="center">
              <CustomButton
                label={'Subscribe'}
                variant="primary"
                onPress={submitSubscriptions}
                width={221}
                height={53}
              />
            </Box>
          )}
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    elevation: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 17,
    zIndex: theme.zIndices['5'],
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    height: 36,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    paddingLeft: theme.spacing.xxl,
  },
  teamItem: {
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.xxl,
  },
  subscribedTeam: {
    backgroundColor: theme.colors.black,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.xxl,
  },
}))
