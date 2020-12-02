import { APP_REGEX, VALIDATIONS } from '../Constant'

export const isArrayNonEmpty = (array: any) => {
  return array && array.length
}

export const isEmptyObject = (obj: any) => {
  return obj && typeof obj === 'object' && !Object.keys(obj).length
}

export const isValidValue = (value: any, defaultVal = '' as any) => {
  return !value ? defaultVal : value
}

export const isStringEmpty = (stringValue: string) => {
  return !stringValue && stringValue.trim() === ''
}

export const validateName = (nameValue: string) => {
  nameValue = nameValue.trim()
  if (!nameValue || nameValue.length > VALIDATIONS.NAME_MAX_LENGTH) {
    return false
  }
  return true
}

/* To handle email validation */
export const validateEmail = (emailAddress: string) => {
  if (!APP_REGEX.REGEX_EMAIL.test(emailAddress)) {
    return false
  }
  return true
}

export const validateSpace = (text: any) => {
  let reg = APP_REGEX.REGEX_SPACE
  if (reg.test(text)) {
    return true
  }
  return false
}

/* To validate password */
export const validatePassword = (passwordValue: string) => {
  if (isStringEmpty(passwordValue) || validateSpace(passwordValue)) {
    return true
  }
  return false
}

export const validatePhoneNumber = (phoneNumber: string) => {
  if (!APP_REGEX.PHONE_NUMBER.test(phoneNumber)) {
    return false
  }
  return true
}

export const validateCoordinates = (text: any) => {
  let reg = APP_REGEX.REGEX_COORDINATES
  if (reg.test(text)) {
    return true
  }
  return false
}

export const validateInputField = (text: any) => {
  let isEmpty = isStringEmpty(text)
  if (isEmpty) {
    return false
  }
  return true
}

export const validateZipCode = (zipCode: string) => {
  if (!APP_REGEX.REGEX_TEXT_NUMBER.test(zipCode)) {
    return false
  }
  return true
}
