import { useModalStyles } from 'components/ConfirmationModal'
import React from 'react'
import Modal from 'react-native-modal'
import { Box, Text } from 'utils/theme'
import { CircleStatusIcon } from './CircleStatusIcon'
import { CustomButton, CustomButtonProps } from './CustomButton'

type ActionModalVariants = 'regular' | 'success' | 'error'
type ExtraBtnProps = {
  onPress: F0
  label: string
  variant?: CustomButtonProps['variant']
}

export type ActionModalProps = {
  onUserAction: F0
  isVisible: boolean
  variant: ActionModalVariants
  label: string
  header?: string
  content?: string
  extraButtons?: ExtraBtnProps[]
  onBackdropPress?: F0
}

export const ActionModal = (p: ActionModalProps) => {
  const styles = useModalStyles()
  const iconHeight = 54
  return (
    <Modal
      isVisible={p.isVisible}
      style={styles.nativeModalStyleReset}
      hasBackdrop={!!p.onBackdropPress || false}
      backdropColor="transparent"
      onBackdropPress={p.onBackdropPress}
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
        {!!p.content && (
          <Text variant="textSM" textAlign="center" marginTop="s">
            {p.content}
          </Text>
        )}
        <Box marginTop={p.variant === 'regular' ? 'm' : 'xl'}>
          <CustomButton label={p.label} variant="primary" onPress={p.onUserAction} />
        </Box>
        {p.extraButtons?.length &&
          p.extraButtons.map((btnProps) => (
            <Box marginTop="m" key={btnProps.label}>
              <CustomButton
                label={btnProps.label}
                variant={btnProps.variant ?? 'secondary'}
                onPress={btnProps.onPress}
              />
            </Box>
          ))}
      </Box>
    </Modal>
  )
}
