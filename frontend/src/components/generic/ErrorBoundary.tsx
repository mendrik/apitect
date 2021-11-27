import React, { Component, createContext, ErrorInfo } from 'react'

import { ExtendedError } from '../../shared/types/extendedError'
import { Fn } from '../../shared/types/generic'
import { logger } from '../../shared/utils/logger'

type ErrorContext = {
  error?: ExtendedError
  clearError: Fn
}

export const errorContext = createContext<ErrorContext>({ clearError: () => 0 })

export class ErrorBoundary extends Component<{}, { error?: Error }> {
  constructor(props: {}) {
    super(props)
    this.state = {}
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(error.message, errorInfo)
  }

  render() {
    return (
      <errorContext.Provider
        value={{
          error: this.state.error,
          clearError: () => this.setState({})
        }}
      >
        {this.props.children}
      </errorContext.Provider>
    )
  }
}
