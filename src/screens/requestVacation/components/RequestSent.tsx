import React from 'react'
import { ModalProps } from 'react-native-modal'

import { mkUseStyles, Theme, Box, Text } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'

type RequestSentProps = Pick<ModalProps, 'isVisible'> & {
  onPress1: F0
  onPress2: F0
  onPress3: F0
}

export const RequestSent = ({ isVisible, onPress1, onPress2, onPress3 }: RequestSentProps) => {
  const styles = useStyles()

  if (!isVisible) return null

  return (
    <Box style={styles.modal}>
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
            <CustomButton label="See request" onPress={onPress1} />
          </Box>
          <Box style={styles.button}>
            <CustomButton label="Add another request" onPress={onPress2} />
          </Box>
          <Box style={styles.button}>
            <CustomButton label="Ok, cool!" variant="blackBgButton" onPress={onPress3} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: -5,
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
