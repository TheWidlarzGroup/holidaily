import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { calculatePTO } from 'utils/dates'

export type RequestVacationData = {
  step: number
  startDate?: Date
  endDate?: Date
  requestData: {
    description: string
    message: string
    photos: AttachmentType[]
    files: (AttachmentType & { name: string })[]
  }
  sickTime: boolean
  isPeriodInvalid: boolean
}

export type RequestVacationContextProps = RequestVacationData & {
  setStep: F1<number>
  setStartDate: F1<Date | undefined>
  setEndDate: F1<Date | undefined>
  setRequestData: React.Dispatch<React.SetStateAction<RequestVacationData['requestData']>>
  markSickTime: F0
  cancelSickTime: F0
  toggleSickTime: F0
}

const RequestVacationContext = createContext<RequestVacationContextProps | undefined>(undefined)

export const RequestVacationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext()
  const [step, setStep] = useState(0)
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [requestData, setRequestData] = useState<RequestVacationData['requestData']>(emptyRequest)
  const [sickTime, { setTrue: markSickTime, setFalse: cancelSickTime, toggle: toggleSickTime }] =
    useBooleanState(false)
  const isPeriodInvalid = useMemo(() => {
    if (sickTime || user?.availablePto === undefined || !startDate) return false
    return user.availablePto < calculatePTO(startDate, endDate ?? startDate)
  }, [startDate, endDate, sickTime, user?.availablePto])
  return (
    <RequestVacationContext.Provider
      value={{
        step,
        startDate,
        endDate,
        requestData,
        sickTime,
        isPeriodInvalid,
        setStep,
        setStartDate,
        setEndDate,
        setRequestData,
        markSickTime,
        cancelSickTime,
        toggleSickTime,
      }}>
      {children}
    </RequestVacationContext.Provider>
  )
}

export const useRequestVacationContext = () => {
  const context = useContext(RequestVacationContext)
  if (context) return context
  throw new Error('Use this hook in RequestVacationContext scope')
}

const emptyRequest = {
  description: '',
  message: '',
  photos: [],
  files: [],
}
