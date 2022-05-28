import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AddButton, ADD_BTN_WIDTH } from 'components/AddButton'
import { mkUseStyles, Theme, Box } from 'utils/theme'
import { getBottomTabIcon } from 'utils/getBottomTabIcon'
import { AppNavigationType } from 'navigation/types'
import { BorderlessButton } from 'react-native-gesture-handler'
import { tabsBorderRadius } from 'navigation/service/tabsBorderRadius'

type TabsHandlerProps = {
  tabs: {
    name: string
  }[]
  tabWidth: number
  activeTabIndex: number
}

export const TabsHandler: FC<TabsHandlerProps> = ({ tabs, tabWidth, activeTabIndex }) => {
  const styles = useStyles()
  const navigation = useNavigation<AppNavigationType<'DRAWER_NAVIGATOR'>>()

  return (
    <Box flexDirection="row">
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
            <Box key="logo" backgroundColor="transparent" width={ADD_BTN_WIDTH}>
              <AddButton onPress={onPress} />
            </Box>
          )
        }

        return (
          <Box
            {...{ key }}
            height={40}
            width={tabWidth}
            marginTop="lplus"
            alignItems="center"
            flexDirection="column"
            backgroundColor="white"
            zIndex="5"
            borderTopLeftRadius={tabsBorderRadius({ key, side: 'left' })}
            borderTopRightRadius={tabsBorderRadius({ key, side: 'right' })}>
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
