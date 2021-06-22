import React, { FC } from 'react'
import { ModalProps } from 'react-native-modal'

import { Text, mkUseStyles, Box } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { getMonthName } from 'utils/dates'

type SelectPeriodModalProps = Pick<ModalProps, 'isVisible'> & {
  onSubmit: F0
  periodStart: string
  periodEnd: string
}

export const SelectPeriodModal: FC<SelectPeriodModalProps> = ({
  isVisible,
  onSubmit,
  periodEnd,
  periodStart,
}) => {
  const styles = useStyles()

  if (!isVisible) return <Box />

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()} ${getMonthName(date.getMonth() + 1, 'pl').slice(0, 3)} `
  }

  return (
    <Box style={styles.modal}>
      <Text variant="boldBlackCenter18">
        {formatDate(periodStart)}
        {periodEnd !== periodStart && ` - ${formatDate(periodEnd)}`}
      </Text>
      <Text variant="body1" marginTop="xs" marginBottom="l">
        ({'n'} days of PTO)
      </Text>
      <CustomButton label="Select" variant="primary" onPress={onSubmit} />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xl,
  },
}))
