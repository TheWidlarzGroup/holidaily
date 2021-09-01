export type EmployeeTypes = {
  confirmed: boolean
  email: string
  firstName: string
  id: string
  lastName: string
  occupation: string
  organization: string
  role: string
}
export type FetchEmployeesQueryTypes = {
  users: EmployeeTypes[]
}
