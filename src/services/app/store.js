import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createEpicMiddleware} from 'redux-observable'
import rootEpic from './epics'
import app from './reducer'

const epicMiddleware = createEpicMiddleware()
const store = createStore(app, composeWithDevTools(applyMiddleware(epicMiddleware)))

epicMiddleware.run(rootEpic)

export default store
