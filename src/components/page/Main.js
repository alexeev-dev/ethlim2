import React, {Component} from 'react'
import {Route, Switch, Redirect} from "react-router-dom"

import {Analytics} from 'components/analytics'
import {Timeline} from 'components/timeline'
import {Authorization, NotFound, Start} from './'

import style from './styles/Main.module.scss'

class Main extends Component {
  saveHistory = ref => this.history = ref

  handleScroll = () => {
    const {hasMore, isPending, location, onScroll} = this.props

    if(hasMore && !isPending && location.pathname === '/timeline') {
      if( this.history.scrollHeight - this.history.scrollTop - this.history.getBoundingClientRect().height - 100 <= 0) {
        onScroll()
      }
    }
  }

  renderStart() {
    const {isAuth, isProjectSelected} = this.props
    return !isAuth
      ? <Route path="/" exact component={Authorization} />
      : !isProjectSelected
        ? <Route path="/" exact component={Start} />
        : <Route path="/" exact component={Analytics} />
  }

  needRedirectToAuth() {
    const {location, isAuth} = this.props
    return !isAuth && !this.hasSavedToken() && location.pathname !== '/'
  }

  hasSavedToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('api-auth-token') !== null
    }
    return false
  }

  render() {
    if (this.needRedirectToAuth()) {
      return <Redirect to="/" />
    }
    return (
      <div ref={this.saveHistory} className={style.normal} onScroll={this.handleScroll}>
        <Switch>
          {this.renderStart()}
          <Route path="/timeline" component={Timeline} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default Main
