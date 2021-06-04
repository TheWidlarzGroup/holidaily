import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconPalm from 'assets/icons/icon-palm.svg'
// import IconPlane from 'assets/icons/icon-plane.svg'
import IconSuitcase from 'assets/icons/icon-suitcase.svg'
import { colors } from 'utils/theme/colors'
import { StyleSheet } from 'react-native'

export const DashboardCarousel: FC = () => {
  const firstName = 'Peter'
  const lastName = 'Kansas'

  return (
    <Box style={styles.personContainer}>
      <Box style={styles.avatar}>
        <IconProfile />
        <Box style={styles.holidayTag}>
          <IconPalm />
        </Box>
      </Box>
      <Text variant="lightBlack12">{firstName}</Text>
      <Text variant="lightBlack12">{lastName}</Text>
      <Box style={styles.holidays}>
        <IconSuitcase />
        <Text marginLeft="xs" style={styles.holidaysActive}>
          Wednesday
        </Text>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  personContainer: {
    alignItems: 'center',
  },
  holidayTag: {
    backgroundColor: colors.tertiary,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36 / 2,
    position: 'absolute',
    top: -36 / 3,
    left: -36 / 3,
    borderWidth: 4,
    borderColor: colors.blackBtnRippleColor,
  },
  avatar: {
    marginHorizontal: 36,
    marginTop: 36,
  },
  holidays: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holidaysActive: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.tertiary,
  },
})
