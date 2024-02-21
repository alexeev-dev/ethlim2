import React, {Component} from 'react'

import style from './styles/Projects.module.scss'

class Projects extends Component {
  handleClick = (event) => {
    event.preventDefault()
    const {onAction} = this.props
    const id = event.target.getAttribute('data-id')

    if (typeof onAction === 'function') {
      onAction(id)
    }
  }

  render() {
    const {projects} = this.props
    return (
      <div className={style.normal}>
        <ul className={style.projectsList}>
          {projects && projects.map(project => {
            const {isSelected} = project.meta
            return (
              <li className={style.projectsItem} key={project.id}>
                <button className={isSelected ? style.selected : style.projectsButton} data-id={project.id} onClick={this.handleClick}>
                  {project.attributes.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Projects
