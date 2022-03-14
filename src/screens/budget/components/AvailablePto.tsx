import React from 'react'
import { Box, mkUseStyles, Text, Theme, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import Info from 'assets/icons/icon-info.svg'

export const AvailablePto = ({ availablePto }: { availablePto: number }) => {
  const { t } = useTranslation('budget')
  const theme = useTheme()
  const styles = useStyles()
  return (
    <>
      <Info style={[styles.infoIcon]} />
      <Text marginTop="xxm" variant="captionText" lineHeight={14}>
        {t('have')}
      </Text>
      <Text marginVertical="xxm" variant="bold24" color="tertiary">
        {t('left', { number: availablePto })}
      </Text>
      <Text marginBottom="xm" variant="lightGreyRegular">
        {t('of', { number: String(PTO_LIMIT) })}
      </Text>
      <Box
        style={[styles.progressTranslation]}
        width={`${(availablePto / PTO_LIMIT) * 100}%`}
        height={theme.spacing.xs}
        backgroundColor="tertiary"
        zIndex="2"
      />
      <Box width="100%" height={theme.spacing.xs} backgroundColor="headerGrey" />
    </>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  progressTranslation: {
    transform: [
      {
        translateY: 4,
      },
    ],
  },
  infoIcon: {
    position: 'absolute',
    right: 0,
    color: theme.colors.headerGrey,
  },
}))

// TODO:This should come from the backend as an internal company policy
const PTO_LIMIT = 26
