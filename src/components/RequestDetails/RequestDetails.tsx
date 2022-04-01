import React from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { DayOffRequest } from 'mock-api/models'
import { calculatePTO } from 'utils/dates'
import BackgroundPlant1 from 'assets/backgroundPlant1.svg'
import BackgroundPlant2 from 'assets/backgroundPlant2.svg'
import { RequestDetailsHeader } from './RequestDetailsHeader'
import { RequestSicktimeAndMessage } from './RequestSicktimeAndMessage'
import { RequestAttachments } from './RequestAttachments'
import { TakenPtoSummary } from './TakenPtoSummary'
import { CircleStatusIcon } from './CircleStatusIcon'

type RequestDetailsProps = {
  attachments?: { id: string; uri: string }[]
  showStatus?: true
}

export const RequestDetails = (
  p: Omit<DayOffRequest, 'id' | 'user' | 'isOnHoliday'> & RequestDetailsProps
) => {
  const styles = useStyles()
  const { t } = useTranslation('seeRequest')
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box backgroundColor="primary" borderRadius="m" paddingBottom="xxxxl" overflow="hidden">
        <BackgroundPlant1 style={styles.plant1} />
        <BackgroundPlant2 style={styles.plant2} height={90} />
        {!!p.showStatus && (
          <Box bg="primary">
            <Box
              position="absolute"
              height="100%"
              width="100%"
              bg="white"
              opacity={0.3}
              alignItems="center"
              justifyContent="center"
              zIndex="-1"
            />
            <Box padding="m" flexDirection="row" alignItems="center">
              <CircleStatusIcon status={p.status} />
              <Text fontFamily="Nunito-Bold" fontSize={16} lineHeight={20}>
                {t(p.status)}
              </Text>
            </Box>
          </Box>
        )}
        <Box padding="m">
          <RequestDetailsHeader
            startDate={p.startDate}
            endDate={p.endDate}
            description={p.description}
          />
          <RequestSicktimeAndMessage isSick={p.isSickTime} message={p.message} />
          <RequestAttachments attachments={p.attachments} />
          <Box borderBottomColor="black" borderBottomWidth={2} marginVertical="m" />
          <TakenPtoSummary ptoTaken={calculatePTO(p.startDate, p.endDate)} />
        </Box>
      </Box>
    </ScrollView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  plant1: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: theme.zIndices['10'],
  },
  plant2: {
    position: 'absolute',
    bottom: 0,
    left: -30,
    zIndex: theme.zIndices['10'],
  },
  button: {
    marginTop: 20,
  },
}))
