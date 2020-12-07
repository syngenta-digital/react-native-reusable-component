export const VALIDATIONS = {
  PHONE_NUMBER_LENGTH: 14, //20
  MIN_MOBILE_DIGITS_LENGTH: 8,
  NAME_MAX_LENGTH: 50,
  COORDINATES_MAX_LENGTH: 11,
  ADJUSTED_SIZE: 9,
  PROPERTY_NAME_MAX_LENGTH: 25,
  EMAIL_MAX_LENGTH: 100,
  ZIP_CODE_MAX_LENGTH: 15,
  CITY_MAX_LENGTH: 50,
  COUNTRY_MAX_LENGTH: 25,
  STATE_MAX_LENGTH: 50,
  FIELD_NAME_MAX_LENGTH: 25,
  EIN_MAX_LENGTH: 20,
  ADDRESS_MAX_LENGTH: 100,
  SEASONS_NAME_LENGTH: 50,
  SEARCH_FIELD_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 50,
  COMMENTS_MAX_LENGTH: 100,
  TOTAL_QTY: 11
}

export const APP_REGEX = {
  //only characters a-z and A-Z
  REGEX_CHARACTERS: /^(?=.{0,364}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_ )[a-zA-Z\d])*)+$/,
  REGEX_COORDINATES: /^-?[0-9]{1,3}(?:\.[0-9]{1,6})?$/,
  REGEX_ADJUSTED_SIZE: /^[0-9]{1,6}(?:\.[0-9]{1,2})?$/,

  // Alpha Numeric Characters a-z, A-Z, 0-9
  //private REGEX_ALPHA_NUMERIC = /^[a-zA-Z0-9]+$/;

  //email validation
  REGEX_SPACE: /^\S*$/,
  REGEX_EMAIL: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)\.([a-zA-Z]{2,5})$/,

  // 8 digit Alpha Numeric
  REGEX_PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,

  PHONE_NUMBER: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,

  PHONE_NUMBER_FORMAT: /^(\d{3})(\d{3})(\d{4})$/,

  ADD_SPACE: /\D/g,

  REMOVE_SPACE: /\s/g,

  REGEX_CHECK_WHITE_SPACE: /\s/,

  REGEX_TEXT_SPACE: /^[a-zA-Z]+(?:[\s]+[a-zA-Z]+)*$/,

  REGEX_TEXT_NUMBER: /^[a-zA-Z0-9]+(?:[\s]+[a-zA-Z0-9]+)*$/
}
