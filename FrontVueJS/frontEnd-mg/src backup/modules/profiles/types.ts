export type submitUpdateProfile = {
id?: string
email?: string
fullName?: string
idUser?: string
phoneNumber?: string
positionId?: string
position?: string[]
departmentId?: string
department?: string
role?: string
statusId?: string
status?: string[]
skillIds?: string[]
skills?: string[]
qualifications?: string[]
qualificationIds?: string[]
isActive?: boolean

}

export type submitUpdateSkills = {
  title?:       string
  description?: string
}

export type submitUpdateQualifications = {
  id?:              string
  title?:           string
  field?:           string
  institute?:       string
  dateObtained?: string
}
