import React from 'react'
import { Box, Text, mkUseStyles, Theme, useTheme, BaseOpacity } from 'utils/theme'
import IconBack from 'assets/icons/icon-back2.svg'
import Info from 'assets/icons/icon-info.svg'
import CrossIcon from 'assets/icons/icon-close.svg'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'

type BubbleContainerButtonsProps = {
  handleClose: F0
}

export const BubbleContainerButtons = (props: BubbleContainerButtonsProps) => {
  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const [isInfoVisible, { setTrue: showInfo, setFalse: hideInfo }] = useBooleanState(false)
  return (
    <Box position="absolute" zIndex="2" width="100%">
      <Box flexDirection="row">
        <BaseOpacity onPress={props.handleClose} style={styles.backBtn} activeOpacity={0.2}>
          <IconBack color={theme.colors.alwaysWhite} />
        </BaseOpacity>
        <BaseOpacity onPress={showInfo} style={styles.info} activeOpacity={0.2}>
          <Info color={theme.colors.alwaysWhite} />
        </BaseOpacity>
      </Box>
      {isInfoVisible && (
        <Box
          flex={1}
          marginHorizontal="m"
          marginTop="m"
          bg="white"
          borderRadius="l1min"
          padding="m"
          flexDirection="row">
          <Text variant="textSM" style={styles.infoText}>
            {t('colorPickerInfo')}
          </Text>
          <BaseOpacity
            onPress={hideInfo}
            alignSelf="flex-start"
            padding="s"
            top={theme.spacing['-xs']}>
            <CrossIcon color={theme.colors.titleActive} />
          </BaseOpacity>
        </Box>
      )}
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    padding: theme.spacing.m,
    top: 44,
    left: 3,
    zIndex: theme.zIndices['2'],
  },
  info: {
    padding: theme.spacing.m,
    top: 30,
    marginLeft: 'auto',
    zIndex: theme.zIndices['2'],
  },
  infoText: {
    flex: 1,
  },
}))
