import React from 'react'
import {Icon} from 'components/utility'

function toIcon(text, iconClass = '') {
  return text.split('::').map((item, i) => {
    if (i%2 !== 0) {
      return <Icon icon={item} className={iconClass} key={i} />
    }
    return item
  })
}

export default toIcon
