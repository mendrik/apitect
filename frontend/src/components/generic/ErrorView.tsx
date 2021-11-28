import React from 'react'

import { ReactComponent as ErrorSvg } from '../../assets/error.svg'

export const ErrorView = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="d-flex flex-column align-items-center">
          <h2 className="fw-bold">Oh no, something went wrong!</h2>
          <div className="w-75 h-75">
            <ErrorSvg />
          </div>
          <a
            href="https://storyset.com"
            target="_blank"
            rel="noreferrer"
            className="d-block text-decoration-none fs-small"
          >
            Illustration by Storyset
          </a>
        </div>
      </div>
    </div>
  )
}
