import React from 'react'

import style from './styles/LoadingStatus.module.scss'

const LoadingStatus = () => (
  <div className={style.loading}>
    <img className={style.loadingImg} src="/assets/img/table-loading.svg" alt="loading" />
    <p className={style.loadingText}>Data loading...</p>
  </div>
)

export default LoadingStatus
