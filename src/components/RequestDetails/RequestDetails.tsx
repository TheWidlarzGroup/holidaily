import React from 'react'
import { ScrollView } from 'react-native'
import { Box } from 'utils/theme'
import { DayOffRequest } from 'mock-api/models'
import { calculatePTO } from 'utils/dates'
import { RequestDetailsHeader } from './RequestDetailsHeader'
import { RequestSicktimeAndMessage } from './RequestSicktimeAndMessage'
import { RequestAttachments } from './RequestAttachments'
import { TakenPtoSummary } from './TakenPtoSummary'

type RequestDetailsProps = {
  attachments?: { id: string; uri: string }[]
  showStatus?: true
}

export const RequestDetails = (p: Omit<DayOffRequest, 'id' | 'user'> & RequestDetailsProps) => (
  <ScrollView style={{ flex: 1 }}>
    <Box
      backgroundColor="primary"
      borderRadius="m"
      padding="m"
      paddingBottom="xxxxl"
      borderTopLeftRadius={p.showStatus ? 0 : 'm'}
      borderTopRightRadius={p.showStatus ? 0 : 'm'}>
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
  </ScrollView>
)
