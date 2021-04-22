import React, { FC, useEffect, useState } from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Loader } from 'components/Loader'

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [time, setTime] = useState(0)
  useEffect(() => {
    sleep(5000).then(() => setIsLoading(false))
  })
  useEffect(() => {
    const timer = setInterval(() => {
      if (time < 100) {
        setTime((prevCount) => prevCount + 2)
      } else {
        setTime(0)
      }
    })

    if (!isLoading) {
      clearInterval(timer)
    }
    return () => {
      clearInterval(timer)
    }
  }, [time, isLoading])
  return (
    <SafeAreaWrapper>
      <Box margin="xl">
        <Text variant="title1">Welcome in dashboard</Text>
      </Box>
      <Box alignItems="center" backgroundColor="primary">
        <Loader percent={time} />
      </Box>
    </SafeAreaWrapper>
  )
}
