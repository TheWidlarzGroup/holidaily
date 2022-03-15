import React from 'react'
import { Box, Text, mkUseStyles, Theme } from 'utils/theme'
import { useTranslation, Trans } from 'react-i18next'

export default function Policies() {
  const styles = useStyles()
  const { t } = useTranslation('budget')
  return (
    <Box style={[styles.policiesContainer]}>
      <Box style={[styles.policySection]}>
        <Text lineHeight={20}>
          <Trans
            ns="budget"
            i18nKey="policyOne"
            components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
          />
        </Text>
      </Box>
      <Box style={[styles.policySection]}>
        <Text lineHeight={20}>
          <Trans
            ns="budget"
            i18nKey="policyTwo"
            components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
          />
        </Text>
        <Text color="grey" fontSize={12} lineHeight={20}>
          {t('policyTwoExample')}
        </Text>
      </Box>
      <Box style={[styles.policySection]}>
        <Text lineHeight={20}>
          <Trans
            ns="budget"
            i18nKey="policyThree"
            components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
          />
        </Text>
      </Box>
    </Box>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },
  policiesContainer: {
    padding: theme.spacing.l,
    marginTop: theme.spacing.l,
  },
  policySection: {
    marginVertical: theme.spacing.m,
  },
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
