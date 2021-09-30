import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import App from './frontend/components/App'
import { ErrorView } from './frontend/components/ErrorView'
import { Loader } from './frontend/components/Loader'
import { Modals } from './frontend/components/Modals'
import { WithProgress } from './frontend/contexts/progress'
import { WithUser } from './frontend/contexts/user'
import { initLocales } from './frontend/locales/locales'
import reportWebVitals from './frontend/reportWebVitals'
import './index.scss'

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
