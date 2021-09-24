import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './frontend/components/App'
import reportWebVitals from './frontend/reportWebVitals'
import { initLocales } from './frontend/locales/locales'
import Loader from './frontend/components/Loader'

const render = (): void =>
  void ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={Loader}>
        <App />
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  )

void initLocales().then(render)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
