import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text, Theme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { ModalHeader } from 'components/ModalHeader'

type TeamHeaderProps = {
  title: string
}
export const TeamHeader = (props: TeamHeaderProps) => {
  const { title } = props
  const { goBack } = useNavigation()
  const styles = useStyles()

  return (
    <ModalHeader>
      <BaseOpacity
        onPress={goBack}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={styles.backBtn}
        activeOpacity={0.5}>
        <IconBack height={18} width={18} />
      </BaseOpacity>
      <Text variant="header">{title}</Text>
      <Box paddingRight="xl" />
    </ModalHeader>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    paddingLeft: theme.spacing.m,
  },
}))
