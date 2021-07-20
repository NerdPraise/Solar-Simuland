export enum StatusCode {
  INITIAL = 0,
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  NOT_FOUND = 404,
}

export const authErrorMessages: Partial<Record<StatusCode, string>> = {
  [StatusCode.BAD_REQUEST]: "Check your internet connection",
  [StatusCode.UNAUTHORISED]: "You are not authorised to view",
  [StatusCode.NOT_FOUND]: "This account does not exist, please do sign up",
}

export const signUpErrorMessages: Partial<Record<StatusCode, string>> = {
  [StatusCode.BAD_REQUEST]: "Unique usernames and email addresses please",
}
