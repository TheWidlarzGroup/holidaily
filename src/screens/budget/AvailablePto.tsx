import React from 'react'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import Info from 'assets/icons/icon-info.svg'

export default function AvailablePto() {
  const { t } = useTranslation('budget')
  const styles = useStyles()
  return (
    <>
      <Info style={[styles.infoIcon]} />
      <Text marginTop="xxm" variant="captionText" lineHeight={14}>
        {t('have')}
      </Text>
      <Text marginVertical="xxm" variant="bold24" color="tertiary">
        {t('left', { number: '14' })}
      </Text>
      <Text marginBottom="xm" variant="lightGreyRegular">
        {t('of', { number: String(PTO_LIMIT) })}
      </Text>
      <Box style={[styles.progress]} />
      <Box style={[styles.progressBar]} />
    </>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  progress: {
    width: `${(14 / PTO_LIMIT) * 100}%`,
    borderRadius: theme.borderRadii.s,
    height: theme.spacing.xs,
    backgroundColor: theme.colors.tertiary,
    zIndex: theme.zIndices['2'],
    transform: [
      {
        translateY: 4,
      },
    ],
  },
  progressBar: {
    width: '100%',
    height: theme.spacing.xs,
    backgroundColor: theme.colors.headerGrey,
  },
  infoIcon: {
    position: 'absolute',
    right: 0,
    color: theme.colors.headerGrey,
  },
}))

// TODO:This should come from the backend as an internal company policy
const PTO_LIMIT = 26
