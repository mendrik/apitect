export class FetchError<T> extends Error {
  constructor(public message: string, public data: T) {
    super('http-error')
  }
}

export const fetchError =
  (message: string) =>
  <T>(data: T) =>
    new FetchError<T>(message, data)
