export class HttpError extends Error {
  constructor(public status: number, message = 'common.error', public field?: string) {
    super(message)
  }
}

export const httpError = (status: number, message: string, field?: string) =>
  new HttpError(status, message, field)
