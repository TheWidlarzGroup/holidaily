import React, { FC, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { CustomButton } from 'components/CustomButton'
import { Box, Text } from 'utils/theme/index'
import CalendarIcon from 'assets/icons/calendar.svg'
import PillIcon from 'assets/icons/pill.svg'
import BackgroundPlant1 from 'assets/backgroundPlant1.svg'
import BackgroundPlant2 from 'assets/backgroundPlant2.svg'

type SecondStepRequestVacationProps = {
  description: string
}

export const SecondStepRequestVacation = ({ description }: SecondStepRequestVacationProps) => {
  return (
    <Box flexDirection="column" justifyContent="space-between" flex={1} paddingTop="xl">
      <Box backgroundColor="primary" borderRadius="m" padding="m" flex={0.7}>
        <BackgroundPlant1 style={plantsStyles.plant1} />
        <BackgroundPlant2 style={plantsStyles.plant2} />
        <Box paddingLeft="s">
          <Text variant="heading4">{description}</Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <CalendarIcon />
          <Text variant="body1Bold">22 April - 26 April</Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <PillIcon />
          <Text variant="body1">Sick time off</Text>
        </Box>
        <Box borderBottomColor="black" borderBottomWidth={2} marginVertical="m" />
        <Box flexDirection="row" justifyContent="space-around" alignItems="center">
          <Box alignItems="center">
            <Text variant="captionText">YOU'RE TAKING</Text>
            <Text variant="heading1">3</Text>
            <Text variant="captionText">DAYS OF PTO</Text>
          </Box>
          <Box alignItems="center">
            <Text variant="captionText">YOU'LL HAVE</Text>
            <Text variant="heading1">19</Text>
            <Text variant="captionText">DAYS OF PTO LEFT</Text>
          </Box>
        </Box>
      </Box>

      <CustomButton label={'next'} variant="primary" onPress={() => {}} />
    </Box>
  )
}

const plantsStyles = StyleSheet.create({
  plant1: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  plant2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
})
