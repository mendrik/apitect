import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

import { Jsx } from '../../shared/types/generic'
import { logger } from '../../shared/utils/logger'

type ErrorContext = {
  error?: Error
  setError: Dispatch<SetStateAction<Error | undefined>>
}

export const errorContext = createContext<ErrorContext>({} as any)

export const ErrorContext = ({ children }: Jsx) => {
  const [error, setError] = useState<Error>()

  if (error) {
    logger.error(error.message)
  }

  return (
    <errorContext.Provider
      value={{
        error,
        setError
      }}
    >
      {children}
    </errorContext.Provider>
  )
}