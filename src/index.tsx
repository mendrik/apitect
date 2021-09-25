import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './frontend/components/App'
import { Error } from './frontend/components/Error'
import { initLocales } from './frontend/locales/locales'
import reportWebVitals from './frontend/reportWebVitals'
import './index.scss'

const render = (): void =>
  void ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={<Error />}>
        <BrowserRouter>
          <Routes>
            <Route path="/*">
              <App />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  )

const start = async () => initLocales().then(render)

void start()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
