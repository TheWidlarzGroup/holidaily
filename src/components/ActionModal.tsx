import { useModalStyles } from 'components/ConfirmationModal'
import React from 'react'
import { ViewProps } from 'react-native'
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
  label: string
  variant?: ActionModalVariants
  header?: string
  content?: string
  extraButtons?: ExtraBtnProps[]
  onBackdropPress?: F0
  extraStyle?: ViewProps['style']
}

const ICON_HEIGHT = 54

export const ActionModal = (p: ActionModalProps) => {
  const styles = useModalStyles()
  return (
    <Modal
      isVisible={p.isVisible}
      style={styles.nativeModalStyleReset}
      hasBackdrop={!!p.onBackdropPress || false}
      backdropColor="transparent"
      onBackdropPress={p.onBackdropPress}
      coverScreen={false}>
      <Box style={[styles.bottomModal, p.extraStyle]}>
        {p.variant && p.variant !== 'regular' && (
          <CircleStatusIcon
            height={ICON_HEIGHT}
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
        <Box marginTop={p.variant === 'regular' || !p.variant ? 's' : 'xl'}>
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
