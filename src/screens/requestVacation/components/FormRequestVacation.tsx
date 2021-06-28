import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
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
  const { control, handleSubmit } = useForm()
  const [sickTime, { toggle }] = useBooleanState(false)
  const [showMessageInput, { toggle: toggleShowMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)

  const handleLoginUser = (data: FormTypes) => {
    changeRequestData((oldData) => ({ ...oldData, description: data.description, sickTime }))
    nextStep()
  }

  const onFormSubmit = handleSubmit((data: FormTypes) => handleLoginUser(data))

  const handleMessageSubmit = (value: string) => {
    changeRequestData((oldData) => ({ ...oldData, message: value }))
    hideMessageInput()
  }

  return (
    <Box flex={1}>
      <ScrollView style={{ padding: 20 }}>
        <Details control={control} date={date} />
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
          <CustomButton label={'next'} variant="primary" onPress={onFormSubmit} />
        )}
      </Box>
    </Box>
  )
}
