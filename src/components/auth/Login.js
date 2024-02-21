import React, {Component} from 'react'
import {Form, FormModule, Input, AuthCheckbox} from 'components/forms'

import style from './styles/Login.module.scss'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }

  handlePass = event => {
    event.preventDefault()
    const {onForgotPass} = this.props

    if (typeof onForgotPass === 'function') {
      onForgotPass()
    }
  }

  handleChange = (name, value) => {
    this.setState({[name]: value})
  }

  handleCheck = event => {
    const {name} = event.target
    this.setState(prev => ({[name]: !prev[name]}))
  }

  handleSubmit = event => {
    event.preventDefault()
    const {onSubmit} = this.props
    const {username, password, remember} = this.state
    const user = {username, password, remember}

    if (typeof onSubmit === 'function') {
      onSubmit(user)
    }
  }

  render() {
    const {username, password, remember} = this.state
    return (
      <Form
        title="Login, please"
        subtitle="Enter your email and password to continue."
        buttonText="Sign in"
        onSubmit={this.handleSubmit}
      >
        <FormModule>
          <p className={style.formModuleHeader}>User name</p>
          <Input
            name="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
        </FormModule>
        <FormModule>
          <p className={style.formModuleHeader}>
            Password
            {/* <a className={style.forgotPass} href="/" onClick={this.handlePass}>Forgot your password?</a> */}
          </p>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
        </FormModule>
        <AuthCheckbox
          isActive={remember}
          name="remember"
          onChange={this.handleCheck}
        >
          Remember me
        </AuthCheckbox>
      </Form>
    )
  }
}

export default Login
