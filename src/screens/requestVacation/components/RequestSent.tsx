import React from 'react'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { theme, mkUseStyles, Theme, Box, Text } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'

type RequestSent = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
}

export const RequestSent = ({ isVisible, hideModal }: RequestSent) => {
  // TODO: IOS setup required
  const styles = useStyles()

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <Box
        alignItems="center"
        paddingHorizontal="xxl"
        flex={1}
        paddingBottom="xl"
        justifyContent="flex-end">
        <Text variant="heading4" marginBottom="xxl">
          Request sent!
        </Text>
        <Text variant="body1" marginBottom="l">
          Now wait for the request approval, and do not pack your suitcase yet!
        </Text>
        <Text variant="body1">You will find all requests at the bottom of the screen.</Text>
        <Box marginTop="xl">
          <Box style={styles.button}>
            <CustomButton label="See request" />
          </Box>
          <Box style={styles.button}>
            <CustomButton label="Add another request" />
          </Box>
          <Box style={styles.button}>
            <CustomButton label="Ok, cool!" variant="blackBgButton" />
          </Box>
        </Box>
      </Box>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    top: 20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
  button: {
    marginVertical: 5,
  },
}))
