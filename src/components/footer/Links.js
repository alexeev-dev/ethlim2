import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import {Icon} from 'components/utility'

import style from './styles/Links.module.scss'

class Links extends Component {
  render() {
    const {links} = this.props
    return (
      <ul className={style.normal}>
        {links.map(l => (
          <li key={l.link} className={style.item}>
            <NavLink exact to={l.link} className={style.link} activeClassName={style.active}>
              <Icon icon={l.icon} className={style.icon} />
              <p className={style.title}>{l.title}</p>
              {l.link === '/timeline' && <span className={style.beta}><Icon icon="beta" /></span>}
            </NavLink>
          </li>
        ))}
      </ul>
    )
  }
}

export default Links
