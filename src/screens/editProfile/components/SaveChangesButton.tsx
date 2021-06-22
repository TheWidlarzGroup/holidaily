import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { mkUseStyles, Theme, Box } from 'utils/theme'

type SaveChangesButtonProps = {
  handleEditDetailsSubmit: F0
}

export const SaveChangesButton = ({ handleEditDetailsSubmit }: SaveChangesButtonProps) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  return (
    <Box
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      backgroundColor="white"
      height={85}
      alignItems="center"
      justifyContent="center"
      style={styles.shadow}>
      <CustomButton
        width={221}
        height={53}
        label={t('saveChanges')}
        variant="primary"
        onPress={handleEditDetailsSubmit}
      />
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
