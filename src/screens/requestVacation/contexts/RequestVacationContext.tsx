import { useBooleanState } from 'hooks/useBooleanState'
import React, { createContext, useContext, useState } from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'

export type RequestVacationData = {
  step: number
  startDate: Date | undefined
  endDate: Date | undefined
  requestData: {
    description: string
    message: string
    photos: AttachmentType[]
    files: (AttachmentType & { name: string })[]
  }
  sickTime: boolean
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
  const [step, setStep] = useState(0)
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [requestData, setRequestData] = useState<RequestVacationData['requestData']>(emptyRequest)
  const [sickTime, { setTrue: markSickTime, setFalse: cancelSickTime, toggle: toggleSickTime }] =
    useBooleanState(false)
  return (
    <RequestVacationContext.Provider
      value={{
        step,
        startDate,
        endDate,
        requestData,
        sickTime,
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
