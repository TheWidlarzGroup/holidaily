import React, { FC } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { mkUseStyles, Theme, theme } from 'utils/theme'

type EdgesTypes = 'top' | 'bottom' | 'left' | 'right'

type WrapperProps = {
  isDefaultBgColor?: boolean
  isTabNavigation?: boolean
  edges?: EdgesTypes[]
}
export const SafeAreaWrapper: FC<WrapperProps> = ({
  isDefaultBgColor,
  isTabNavigation,
  edges,
  children,
}) => {
  const styles = useStyles()
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <SafeAreaView
        edges={edges || ['top', 'right', 'bottom', 'left']}
        style={[
          styles.container,
          !isDefaultBgColor && styles.containerBackground,
          isTabNavigation && { paddingBottom: theme.spacing.xxxl },
        ]}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    flex: 1,
  },
  containerBackground: {
    backgroundColor: theme.colors.mainBackground,
  },
}))
