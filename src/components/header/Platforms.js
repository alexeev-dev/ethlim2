import React, {Component} from 'react'

import {ProjectsContainer} from 'containers'

import style from './styles/Platforms.module.scss'

class Platforms extends Component {
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
    const {platforms} = this.props
    return (
      <div className={style.normal}>
        <ul className={style.platformsList}>
          {platforms.map(platform => {
            const {isSelected, isFetching, hasError} = platform.meta
            return (
              <li key={platform.id} className={style.platformsItem}>
                <button className={isSelected ? style.selected : style.platformsButton} data-id={platform.id} onClick={this.handleClick}>
                  {platform.attributes.name}
                  {isFetching && <img className={style.loading} src="/assets/img/loading.svg" alt=""/>}
                </button>
                {isSelected && !isFetching && !hasError && <div className={isSelected ? style.opened : style.projects}>
                  <ProjectsContainer onProjectSelected={this.handleProject}/>
                </div>}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Platforms
