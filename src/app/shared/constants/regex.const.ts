export const RegexPatterns = {
  TEXT_ONLY: /^[a-zA-Z ]+$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9 ]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  MOBILE_PHONE: /^9(\d){8}$/,
  NATURAL_NUMBER: /^[0-9]+$/,
  NEGATIVE_NATURAL_NUMBER: /^-?[0-9]+$/,
  DECIMAL_NUMBER: /^[0-9]+(\.[0-9]{1,4})?$/,
  NEGATIVE_DECIMAL_NUMBER: /^-?[0-9]+(\.[0-9]{1,4})?$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^([0-1][0-9]|2[0-3]):?[0-5][0-9]$/,
}