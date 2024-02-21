import React, {Component} from 'react'

import {PlatformsContainer} from 'containers'

import style from './styles/Sources.module.scss'

class Sources extends Component {
  handleClick = (event) => {
    event.preventDefault()
    const {onAction} = this.props
    const id = event.target.getAttribute('data-id')

    if (typeof onAction === 'function') {
      onAction(id)
    }
  }

  handleProject = (project) => {
    const {onProjectSelected} = this.props
    if (typeof onProjectSelected === 'function') {
      onProjectSelected(project)
    }
  }

  render() {
    const {sources} = this.props
    return (
      <div className={style.normal}>
        <ul className={style.sourcesList}>
          {sources.map(source => {
            const {isSelected, isFetching, hasError} = source.meta
            return (
              <li key={source.id} className={isSelected ? style.opened : style.sourcesItem}>
                <button className={isSelected ? style.selected : style.sourcesButton} data-id={source.id} onClick={this.handleClick}>
                  <img className={style.icon} src={`https://api.cloudmind.ru/static/rest_framework/img/trafficsource_${source.id}.svg`} alt=""/>
                  {source.attributes.name}
                  {isFetching && <img className={style.loading} src="/assets/img/loading.svg" alt=""/>}
                </button>
                {isSelected && !isFetching && !hasError && <PlatformsContainer onProjectSelected={this.handleProject}/>}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Sources
