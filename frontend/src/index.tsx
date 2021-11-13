import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'
import { Modals } from './components/Modals'
import { ErrorView } from './components/generic/ErrorView'
import { Loader } from './components/generic/Loader'
import { WithProgress } from './contexts/withProgress'
import { WithUser } from './contexts/withUser'
import './index.scss'
import { initLocales } from './locales/locales'
import reportWebVitals from './reportWebVitals'

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}

const render = (): void =>
  void ReactDOM.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorView} onError={myErrorHandler}>
        <Suspense fallback={<Loader className="vh-100" />}>
          <WithUser>
            <WithProgress>
              <BrowserRouter>
                <App />
                <Modals />
              </BrowserRouter>
            </WithProgress>
          </WithUser>
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
  )

const start = async () => initLocales().then(render)

void start()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
