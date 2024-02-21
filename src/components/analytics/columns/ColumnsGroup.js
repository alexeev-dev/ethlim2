import React from 'react'

import {ColumnsCheckbox} from '../'
import {toIcon} from 'components/utility'

import {columns as columnsData} from 'services/columns/columns'

import style from './styles/ColumnsGroup.module.scss'

const ColumnsGroup = ({status, group, ...other}) => (
  <li className={style.normal}>
    <p className={style.title}>{toIcon(group.title, style.icon)} :</p>
    {group.columns.map((c, i) => <ColumnsCheckbox
      key={c}
      name={c}
      label={columnsData[c].attributes.titleShort}
      tooltip={columnsData[c].attributes.tooltip}
      isActive={status[c]}
      {...other}
    />)}
  </li>
)

export default ColumnsGroup
