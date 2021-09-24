import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import App from './frontend/components/App'
import Loader from './frontend/components/Loader'
import { initLocales } from './frontend/locales/locales'
import reportWebVitals from './frontend/reportWebVitals'
import './index.scss'

const render = (): void =>
  void ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
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
