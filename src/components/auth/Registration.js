import React, {Component} from 'react'

import {Form, FormModule, Input, AuthCheckbox} from 'components/forms'

import style from './styles/Registration.module.scss'

class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      surname: '',
      email: '',
      pass: '',
      agreement: true,
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
    const {name, surname, email, pass, agreement} = this.state
    const user = {name, surname, email, pass}

    if (typeof onSubmit === 'function' && agreement) {
      onSubmit(user)
    }
  }

  render() {
    const {name, surname, email, pass, agreement} = this.state
    return (
      <Form
        title="New Account"
        subtitle="Please enter your information."
        buttonText="Create new account"
        disableButton={!agreement}
        onSubmit={this.handleSubmit}
      >
        <FormModule>
          <p className={style.formModuleHeader}>What is your name?</p>
          <div className={style.formModuleInputs}>
            <Input
              name="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
            />
            <Input
              name="surname"
              type="text"
              value={surname}
              placeholder="Surname"
              onChange={this.handleChange}
            />
          </div>
        </FormModule>
        <FormModule>
          <p className={style.formModuleHeader}>Email</p>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormModule>
        <FormModule>
          <p className={style.formModuleHeader}>
            Password
            <span className={style.passStrength}>Strong</span>
          </p>
          <Input
            name="pass"
            type="password"
            value={pass}
            onChange={this.handleChange}
          />
        </FormModule>
        <AuthCheckbox
          isActive={agreement}
          name="agreement"
          onChange={this.handleCheck}
        >
          I agree to с&nbsp;<a className={style.agreement} href="/">the terms of use</a>
        </AuthCheckbox>
      </Form>
    )
  }
}

export default Registration
