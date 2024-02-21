import React from 'react'
import {render} from 'react-snapshot'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'

import './styles/index.scss'
import {AppContainer} from './containers'
import * as serviceWorker from './serviceWorker'

import {store} from './services/app'
if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({dsn: "https://f9eb7eb98c2855eedebe093024cf8b7e@o4506694926336000.ingest.sentry.io/4506784600358912"})
  }
}

const Analytics = () => (
  <Provider store={store} >
    <AppContainer />
  </Provider>
)

render(<Analytics />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
