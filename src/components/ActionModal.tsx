import { useModalStyles } from 'hooks/style-hooks/useModalStyles'
import React from 'react'
import Modal from 'react-native-modal'
import { Box, Text, useTheme } from 'utils/theme'
import { CircleStatusIcon } from './CircleStatusIcon'
import { CustomButton } from './CustomButton'

type ActionModalVariants = 'regular' | 'success' | 'error'

type ActionModalProps = {
  onUserAction: F0
  isVisible: boolean
  variant: ActionModalVariants
  header?: string
  content?: string
}

export const ActionModal = (p: ActionModalProps) => {
  const styles = useModalStyles()
  const iconHeight = 54
  return (
    <Modal
      isVisible={p.isVisible}
      style={styles.nativeModalStyleReset}
      hasBackdrop={false}
      coverScreen={false}>
      <Box style={styles.bottomModal}>
        {p.variant !== 'regular' && (
          <CircleStatusIcon
            height={iconHeight}
            marginBottom="m"
            iconProps={{ height: '40%', width: '40%', color: styles.bottomModal.backgroundColor }}
            status={p.variant}
          />
        )}
        {!!p.header && <Text variant="displayBoldSM">{p.header}</Text>}
        {!!p.content && <Text variant="textSM">{p.content}</Text>}
        <Box marginTop="m">
          <CustomButton label="label" variant="primary" onPress={p.onUserAction} />
        </Box>
      </Box>
    </Modal>
  )
}
