import React, {Component} from 'react'

import {SelectedContainer} from 'containers'
import {DatePicker} from 'components/analytics'

import style from './styles/Header.module.scss'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: false
    }
  }

  handleClick = name => {
    this.setState(prev => ({[name]: !prev[name]}))
  }

  render() {
    const {isAuth, isProjectSelected} = this.props
    return (
      <div className={style.normal}>
        <div className={style.header}>
          <div className={style.left}>
            {isAuth && <SelectedContainer onClick={this.handleStart}/>}
            {isProjectSelected && <DatePicker />}
          </div>
          <div className={style.right}>
            <h2 className={style.title}>
              {/*<img className={style.logo} src="/assets/img/logo.png" alt="z1" />*/}
              <span className={style.titleSpan}></span>
            </h2>
            {/* {isAuth && <UserContainer onUser={this.handleClick} />}
            {isAuth && user && <UserInfoContainer />} */}
          </div>
        </div>
      </div>
    )
  }
}

export default Header
