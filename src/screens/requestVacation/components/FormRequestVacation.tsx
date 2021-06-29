import React, { FC } from 'react'
import { ScrollView } from 'react-native'

import { Box } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { useBooleanState } from 'hooks/useBooleanState'
import { Additionals } from './Additionals'
import { MessageInput } from './MessageInput'
import { Details } from './Details'
import { SickTime } from './SickTime'

type FormTypes = {
  date: undefined
  description: string
}

type RequestDataTypes = {
  description: string
  sickTime: boolean
  message: string
}

type FormRequestVacationProps = {
  date: {
    start?: Date
    end?: Date
  }
  nextStep: () => void
  changeRequestData: (callback: (currentData: RequestDataTypes) => RequestDataTypes) => void
  message: string
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  date,
  nextStep,
  changeRequestData,
  message,
}) => {
  const [sickTime, { toggle }] = useBooleanState(false)
  const [showMessageInput, { toggle: toggleShowMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)

  const handleFormSubmit = () => {
    if (!date.start) return
    nextStep()
  }

  const handleDescriptionChange = (description: string) => {
    changeRequestData((oldData) => ({ ...oldData, description }))
  }

  const handleMessageSubmit = (message: string) => {
    changeRequestData((oldData) => ({ ...oldData, message }))
    hideMessageInput()
  }

  return (
    <Box flex={1}>
      <ScrollView style={{ padding: 20 }}>
        <Details onDescriptionChange={handleDescriptionChange} date={date} />
        <SickTime sickTime={sickTime} toggle={toggle} />
        <Additionals
          onPressMessage={toggleShowMessageInput}
          messageContent={showMessageInput ? '' : message}
          showMessageInput={showMessageInput}
        />
        <Box height={50} />
      </ScrollView>
      <Box marginBottom={showMessageInput ? 0 : 'l'}>
        {showMessageInput ? (
          <MessageInput onSubmitEditing={handleMessageSubmit} defaultValue={message} />
        ) : (
          <CustomButton label={'next'} variant="primary" onPress={handleFormSubmit} />
        )}
      </Box>
    </Box>
  )
}
