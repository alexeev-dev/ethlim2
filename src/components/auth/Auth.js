import React, {Component} from 'react'

import {LoginContainer, RegistrationContainer} from 'containers'

import style from './styles/Auth.module.scss'

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: 'login'
    }
  }

  handleChange = event => {
    event.preventDefault()
    const name = event.target.getAttribute('data-name')
    this.setState({auth: name})
  }

  render() {
    const {auth} = this.state
    return auth === 'login'
      ? <div key={auth} className={style.normal}>
          <LoginContainer />
          {/* <p className={style.text}>
            <span className={style.textSpan}>Do not have an account?</span>
            <a
              className={style.change}
              href="/"
              data-name="registr"
              onClick={this.handleChange}
            >Sign up</a>
          </p> */}
        </div>
      : <div key={auth} className={style.normal}>
          <RegistrationContainer />
          <p className={style.text}>
            <span className={style.textSpan}>Have an account?</span>
            <a
              className={style.change}
              href="/"
              data-name="login"
              onClick={this.handleChange}
            >Sign in</a>
          </p>
        </div>
  }
}

export default Auth
