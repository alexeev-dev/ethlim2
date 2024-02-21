import React, {Component} from 'react'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {HeaderContainer, MainContainer, FooterContainer} from 'containers'

import style from './App.module.scss'

const history = createBrowserHistory()

class App extends Component {
  componentDidMount() {
    const {onReady} = this.props
    if (typeof onReady === 'function') {
      onReady()
    }
    this.unlisten = history.listen(this.handleLocationChange)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  handleLocationChange = () => {
    const {onLocationChange} = this.props
    if (typeof onLocationChange === 'function') {
      onLocationChange(history.location)
    }
  }

  render() {
    const {isAuth} = this.props
    return (
      <div className={style.normal}>
        <Router history={history}>
          <HeaderContainer />
          <MainContainer />
          {isAuth && <FooterContainer />}
        </Router>
      </div>
    )
  }
}

export default App
