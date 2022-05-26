import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AddButton } from 'components/AddButton'
import { mkUseStyles, Theme, Box } from 'utils/theme'
import { getBottomTabIcon } from 'utils/getBottomTabIcon'
import { ModalNavigationType } from 'navigation/types'
import { BorderlessButton } from 'react-native-gesture-handler'
import { tabsBorderRadius } from 'navigation/service/tabsBorderRadius'

type TabsHandlerProps = {
  tabs: {
    name: string
  }[]
  tabWidth: number
  activeTabIndex: number
  minIconWidth: number
}

export const TabsHandler: FC<TabsHandlerProps> = ({
  tabs,
  tabWidth,
  activeTabIndex,
  minIconWidth,
}) => {
  const styles = useStyles()
  const navigation = useNavigation<ModalNavigationType<'DRAWER_NAVIGATOR'>>()

  return (
    <Box flexDirection="row" flex={1}>
      {tabs.map((tab, key: number) => {
        const onPress = () => {
          if (tab.name === 'RequestModal') {
            navigation.navigate('REQUEST_VACATION')
          } else {
            navigation.navigate(tab.name as never)
          }
        }
        if (tab.name === 'RequestModal') {
          return (
            <Box key="logo" width={tabWidth} backgroundColor="transparent" minWidth={minIconWidth}>
              <AddButton onPress={onPress} />
            </Box>
          )
        }
        const buttonIdx = Math.floor(tabs.length / 2)
        const tabWidthSetter = (key: number) => (key === 4 ? tabWidth - 6 : tabWidth)

        return (
          <Box
            {...{ key }}
            height={40}
            width={tabWidthSetter(key)}
            marginTop="lplus"
            alignItems="center"
            flexDirection="column"
            backgroundColor="white"
            borderTopLeftRadius={tabsBorderRadius({ key, side: 'left', buttonIdx })}
            borderTopRightRadius={tabsBorderRadius({ key, side: 'right', buttonIdx })}
            zIndex="5">
            <BorderlessButton onPress={onPress} style={styles.button}>
              {getBottomTabIcon(
                tab.name,
                tabs[activeTabIndex].name,
                styles.active.color,
                styles.inactive.color
              )}
            </BorderlessButton>
          </Box>
        )
      })}
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.s,
    paddingBottom: theme.spacing.s,
  },
  active: {
    color: theme.colors.black,
  },
  inactive: {
    color: theme.colors.bottomBarIcons,
  },
}))
