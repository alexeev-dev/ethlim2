import React, {Component} from 'react'

import {SourcesContainer} from 'containers'
import {Icon} from 'components/utility'

import style from './styles/Selected.module.scss'

class Selected extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPopupOpen: false,
      start: true
    }
  }

  saveProjects = ref => this.projects = ref
  saveButton = ref => this.button = ref

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (this.projects && !this.projects.contains(event.target) && event.target !== this.button) {
      this.setState({isPopupOpen: false})
    }
  }

  handleClick = event => {
    event.preventDefault()
    const {onAction} = this.props
    if(typeof onAction === 'function') {
      this.setState(prev => {
        if (prev.isPopupOpen === false) {
          onAction()
        }
        return ({isPopupOpen: !prev.isPopupOpen, start: false})
      })
    }
  }

  handleProject = (project) => {
    this.setState({isPopupOpen: false})
  }

  render() {
    const {status, nav} = this.props
    const {isPopupOpen, start} = this.state
    const {source, traffic, project} = nav

    return (
      <div className={style.normal}>
        <button ref={this.saveButton} className={source ? style.sourceActive : isPopupOpen ? style.sourceActive : style.source} onClick={this.handleClick}>
          <div className={style.sourceWrap}>
            {!project
                ? status === 'fetching'
                  ? <img className={style.loading} src="/assets/img/loading.svg" alt=""/>
                  : <Icon icon="menu-second" className={style.icon} />
              : <span className={style.sourceText}>
                  {status === 'fetching' && <img className={style.loadingSmall} src="/assets/img/loading.svg" alt=""/>}
                  <img className={style.sourceIcon} src={`https://api.cloudmind.ru/static/rest_framework/img/trafficsource_${source.id}.svg`} alt=""/>
                  <span>{source.attributes.name} {traffic && traffic.attributes.name}</span>
                </span>
            }
          </div>
          {project && <p className={style.currentProject}>{project.attributes.name}</p>}
        </button>
        {Array.isArray(status) && <div ref={this.saveProjects} className={isPopupOpen ? style.projectsOpen : style.projects}>
          <SourcesContainer onProjectSelected={this.handleProject}/>
        </div>}
        <div className={`${style.start} ${start ? style.active : ''}`}>Start your work with this button</div>
      </div>
    )
  }
}

export default Selected
