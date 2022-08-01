import { Control, FieldValues } from 'react-hook-form'
import { EditUserSuccess } from 'dataAccess/mutations/useEditUser'

type AnimationStatusProps = {
  animationIsTriggered: F0
  animationNotTriggered: F0
}

type ControlledColorPickerProps = {
  control: Control<FieldValues>
  name: string
  animationStatus: AnimationStatusProps
}

export type UncontrolledColorPickerProps = {
  animationStatus: AnimationStatusProps
  onUpdate?: F1<EditUserSuccess>
}

export type ProfileColorProps = ControlledColorPickerProps | UncontrolledColorPickerProps

export type ProfileColorViewProps = {
  onChange: F1<string>
  value: string
  animationStatus: AnimationStatusProps
}
