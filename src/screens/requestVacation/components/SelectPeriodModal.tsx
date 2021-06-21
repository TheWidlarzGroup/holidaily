import React, { FC, useEffect } from 'react'
import { ModalProps } from 'react-native-modal'

import { colors } from 'utils/theme/colors'
import { Text, mkUseStyles, Box } from 'utils/theme'
import { CustomModal } from 'components/CustomModal'
import { CustomButton } from 'components/CustomButton'

type SelectPeriodModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  periodStart: string
  periodEnd: string
  showModal?: F0
  isConfirmed?: boolean
}

export const SelectPeriodModal: FC<SelectPeriodModalProps> = ({
  isVisible,
  hideModal,
  showModal,
  periodEnd,
  periodStart,
  isConfirmed,
}) => {
  const styles = useStyles()

  useEffect(() => {
    if (!isConfirmed || !showModal) return
    showModal()
  }, [isConfirmed, showModal])

  if (!isVisible) return <Box />

  return (
    <Box style={styles.modal}>
      <Text variant="boldBlackCenter18">
        {periodStart}
        {periodEnd !== periodStart && ` - ${periodEnd}`}
      </Text>
      <Text variant="body1" marginTop="xs" marginBottom="l">
        ({`n`} days of PTO)
      </Text>
      <CustomButton label="Select" variant="primary" />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.l,
  },
}))
