import React, {Component} from 'react'

import style from './styles/Source.module.scss'

class Source extends Component {
  handleClick = event => {
    event.preventDefault()
    const {onChange} = this.props
    const param = event.target.getAttribute('data-param')
    const value = parseInt(event.target.getAttribute('data-id'))

    if (typeof onChange === 'function') {
      onChange('changeParam', {param, value})
    }
  }

  handleSomething = event => {
    event.preventDefault()
    const {onChange} = this.props
    const value = parseInt(event.target.getAttribute('data-id'))

    if (typeof onChange === 'function') {
      onChange('changeParam', {param: 'platform_id', value})
    }
  }

  render() {
    const {traffic_source_id, platform_id} = this.props
    return (
      <div className={style.normal}>
        <div className={style.source}>
          <button
            className={`${traffic_source_id === 1 ? style.active : ''} ${style.sourceButton}`}
            data-param="traffic_sources_id"
            data-id="1"
            onClick={this.handleClick}
          >
            <img className={style.sourceImage} src="/assets/img/Yandex.png" alt="Yandex" />
          </button>
        </div>
        <div className={style.platform}>
          <button
            className={`${style.platformButton} ${platform_id === 1 ? style.active : ''}`}
            data-param="platform_id"
            data-id="1"
            onClick={this.handleSomething}
          >YandexSeach</button>
          <button
            className={`${style.platformButton} ${platform_id === 2 ? style.active : ''}`}
            data-param="platform_id"
            data-id="2"
            onClick={this.handleSomething}
          >YandexPartners</button>
        </div>
      </div>
    )
  }
}

export default Source
