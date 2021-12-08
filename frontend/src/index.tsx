import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import { setErrorMap, ZodErrorMap } from 'zod'

import App from './components/App'
import { Modals } from './components/Modals'
import { ErrorView } from './components/generic/ErrorView'
import { Loader } from './components/generic/Loader'
import { dateLocaleFx } from './events/project'
import { whoAmIFx } from './events/user'
import './index.scss'
import { initLocales } from './locales/locales'
import reportWebVitals from './reportWebVitals'

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}

const errorMap: ZodErrorMap = (error, ctx) => {
  if (ctx.defaultError === 'Required') {
    return { message: 'form.validation.required' }
  }
  return { message: ctx.defaultError }
}

setErrorMap(errorMap)

const render = (): void =>
  void ReactDOM.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorView} onError={myErrorHandler}>
        <Suspense fallback={<Loader className="vh-100" delay={true} />}>
          <BrowserRouter>
            <App />
            <Modals />
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
  )

const start = () =>
  initLocales()
    .then(() => dateLocaleFx(navigator.language))
    .then(whoAmIFx)
    .then(render)

void start()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
