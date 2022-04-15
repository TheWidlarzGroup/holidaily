import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useFetchUserStats } from 'dataAccess/queries/useFetchUserStats'
import { LoadingModal } from 'components/LoadingModal'
import { Stats } from './Stats'
import { Requests } from './Requests'

export const StatsAndRequests = () => {
  const { isLoading, data: stats } = useFetchUserStats()
  if (isLoading || !stats) return <LoadingModal show />
  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Stats stats={stats} />
      <Requests />
    </SafeAreaWrapper>
  )
}
