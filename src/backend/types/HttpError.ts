export class HttpError extends Error {
  constructor(public status: number, message = 'http-error') {
    super(message)
  }
}

export const httpError =
  (status: number, message = 'http-error') =>
  (...args: any[]) =>
    new HttpError(status, message)
