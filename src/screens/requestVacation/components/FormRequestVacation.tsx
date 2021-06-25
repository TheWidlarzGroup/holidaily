import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

import { Box, mkUseStyles, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { InputButton } from 'components/InputButton'
import { CustomButton } from 'components/CustomButton'
import { Checkbox } from 'components/Checkbox'
import { useBooleanState } from 'hooks/useBooleanState'
import { ModalNavigationType } from 'navigation/types'
import { getFormattedPeriod } from 'utils/dates'
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
}

type FormRequestVacationProps = {
  date: {
    start?: Date
    end?: Date
  }
  nextStep: () => void
  changeRequestData: (callback: (currentData: RequestDataTypes) => RequestDataTypes) => void
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  date,
  nextStep,
  changeRequestData,
}) => {
  const { control, handleSubmit, errors } = useForm()
  const [sickTime, { toggle }] = useBooleanState(false)
  const [showMessageInput, { toggle: toggleShowMessageInput }] = useBooleanState(false)

  const handleLoginUser = (data: FormTypes) => {
    //if (Object.keys(errors).length) return
    changeRequestData((oldData) => ({ ...oldData, description: data.description, sickTime }))
    nextStep()
  }

  const styles = useStyles()

  const onFormSubmit = handleSubmit((data: FormTypes) => handleLoginUser(data))

  return (
    <Box flex={1}>
      <ScrollView style={{ padding: 20 }}>
        <Details control={control} date={date} />
        <SickTime sickTime={sickTime} toggle={toggle} />
        <Additionals onPressMessage={toggleShowMessageInput} />
        <Box height={50} />
      </ScrollView>
      <Box>
        {showMessageInput ? (
          <MessageInput />
        ) : (
          <CustomButton label={'next'} variant="primary" onPress={onFormSubmit} />
        )}
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({}))
