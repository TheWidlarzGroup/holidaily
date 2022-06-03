import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { mkUseStyles, Theme, Box, useTheme } from 'utils/theme'

type SaveChangesButtonProps = {
  handleEditDetailsSubmit: F0
  onDiscard: F0
}

export const SaveChangesButton = ({
  handleEditDetailsSubmit,
  onDiscard,
}: SaveChangesButtonProps) => {
  const { t } = useTranslation('userProfile')
  const theme = useTheme()
  const styles = useStyles()
  return (
    <Box
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      backgroundColor="white"
      alignItems="center"
      justifyContent="center"
      style={styles.shadow}>
      <CustomButton
        marginHorizontal={theme.spacing.lplus}
        marginTop={theme.spacing.m}
        label={t('saveChanges')}
        variant="primary"
        onPress={handleEditDetailsSubmit}
      />
      <CustomButton
        marginHorizontal={theme.spacing.lplus}
        marginVertical={theme.spacing.m}
        label={t('discardChanges')}
        variant="secondary"
        onPress={onDiscard}
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
