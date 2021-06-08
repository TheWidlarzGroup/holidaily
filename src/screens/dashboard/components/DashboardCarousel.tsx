import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconPalm from 'assets/icons/icon-palm.svg'
import IconPlane from 'assets/icons/icon-plane.svg'
import IconSuitcase from 'assets/icons/icon-suitcase.svg'
import { colors } from 'utils/theme/colors'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from '../helper'

export const DashboardCarousel: FC = () => {
  const { i18n } = useTranslation()
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed(i18n.language)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => (
        <Box key={item.id} marginBottom="m" style={styles.personContainer}>
          <Box marginHorizontal="m" marginTop="m" marginBottom="xs">
            <IconProfile width={62} height={62} />
            {item.isOnHoliday && (
              <Box bg="tertiary" style={styles.holidayTag}>
                <IconPalm />
              </Box>
            )}
          </Box>
          <Text variant="lightBlack12" style={{ lineHeight: 14 }}>
            {item.user.firstName}
          </Text>
          <Text variant="lightBlack12" style={{ lineHeight: 14 }}>
            {item.user.lastName}
          </Text>
          {item.isOnHoliday ? (
            <Box style={styles.holidays}>
              <IconSuitcase />
              <Text marginLeft="xs" variant="activeHolDate">
                {item.dayToBeDisplayed}
              </Text>
            </Box>
          ) : (
            <Box style={styles.holidays}>
              <IconPlane />
              <Text marginLeft="xs" variant="inActiveHolDate">
                {item.dayToBeDisplayed}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  personContainer: {
    alignItems: 'center',
  },
  holidayTag: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    position: 'absolute',
    top: -12,
    left: -12,
    borderWidth: 4,
    borderColor: colors.disabledText,
  },

  holidays: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
