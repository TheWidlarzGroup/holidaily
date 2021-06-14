import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Text, theme } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { requestDataTypes } from '../RequestVacation'
import { useBooleanState } from 'hooks/useBooleanState'
import { CalendarModal } from './CalendarModal'
import { InputButton } from 'components/InputButton'
import { Checkbox } from 'components/Checkbox'
import AddCommentIcon from 'assets/icons/addComment.svg'
import PaperclipIcon from 'assets/icons/paperclip.svg'

type FormTypes = {
  date: undefined
  description: string
}

type FormRequestVacationProps = {
  nextStep: () => void
  changeRequestData: (callback: (currentData: requestDataTypes) => requestDataTypes) => void
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  nextStep,
  changeRequestData,
}) => {
  const { control, handleSubmit, errors } = useForm()
  const [calendarVisible, { setTrue, setFalse }] = useBooleanState(false)
  const [sickTime, { toggle }] = useBooleanState(false)

  const handleLoginUser = (data: FormTypes) => {
    if (Object.keys(errors).length) return
    changeRequestData((oldData) => ({ ...oldData, description: data.description, sickTime }))
    nextStep()
  }

  const onFormSubmit = handleSubmit((data: FormTypes) => handleLoginUser(data))

  return (
    <Box flex={1} justifyContent="space-between" paddingBottom="m">
      <Box>
        <Box>
          <Text variant="boldBlack18" textAlign="left">
            Details
          </Text>
          <Box marginTop="m">
            <InputButton inputLabel="Date" onClick={setTrue} value={'24 Apr - 22 Jun'} />
          </Box>
          <Box marginTop="m">
            <FormInput
              control={control}
              isError={!!errors.description}
              errors={errors}
              name="description"
              inputLabel="Description (optional)"
              validationPattern={/$/}
              errorMessage="Incorrect description"
              keyboardType="default"
              autoCompleteType="off"
            />
          </Box>
        </Box>
        <Box marginTop="s">
          <Text variant="boldBlack18" textAlign="left">
            Sick time off
          </Text>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text variant="body1" textAlign="left">
              I'm not feeling well
            </Text>
            <Checkbox checked={sickTime} onClick={toggle} />
          </Box>
        </Box>

        <Box>
          <Text variant="boldBlack18" textAlign="left" marginTop="l">
            Additionals
          </Text>
          <Text variant="body1" textAlign="left">
            {' '}
            Add and attachment or write a message{' '}
          </Text>
          <Box flexDirection="row">
            <Box backgroundColor="lightGrey" padding="xm" margin="s" borderRadius="l">
              <PaperclipIcon width={22} height={22} />
            </Box>
            <Box backgroundColor="lightGrey" padding="xm" margin="s" borderRadius="l">
              <AddCommentIcon width={22} height={22} />
            </Box>
          </Box>
        </Box>
        <CalendarModal isVisible={calendarVisible} hideModal={setFalse} />
      </Box>
      <CustomButton label={'next'} variant="primary" onPress={onFormSubmit} />
    </Box>
  )
}
