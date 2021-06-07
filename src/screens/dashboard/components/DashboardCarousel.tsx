import React, { FC } from 'react'
import { Box, Text, theme } from 'utils/theme'
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
        <Box key={item.id} style={styles.personContainer}>
          <Box style={styles.avatar}>
            <IconProfile width={62} height={62} />
            {item.isOnHoliday && (
              <Box style={styles.holidayTag}>
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
              <Text marginLeft="xs" style={styles.holidaysActive}>
                {item.dayToBeDisplayed}
              </Text>
            </Box>
          ) : (
            <Box style={styles.holidays}>
              <IconPlane />
              <Text marginLeft="xs" style={styles.holidaysInActive}>
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
    marginBottom: theme.spacing.m,
  },
  holidayTag: {
    backgroundColor: colors.tertiary,
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
  avatar: {
    marginHorizontal: theme.spacing.m,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.xs,
  },
  holidays: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holidaysActive: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: colors.tertiary,
    lineHeight: 14,
  },
  holidaysInActive: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: colors.black,
    lineHeight: 14,
  },
})
