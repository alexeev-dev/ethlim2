import {connect} from 'react-redux'

import {OUTDATED} from 'services/analytics/reducers/table'

import {FiltersGroup} from 'components/analytics'
import {selectValue, searchValue} from 'services/analytics/actions'
import {fetchValues, toggleDropdown} from 'services/analytics/actions'

const mapDispatchToProps = (dispatch, {filter}) => ({
  onChange(id, value) {
    dispatch(selectValue(id, value))
  },
  onSearch(id, value) {
    dispatch(searchValue(id, value))
  },
  onOpen() {
    dispatch(toggleDropdown(filter.id))
    if (!filter.isOpen && filter.status === OUTDATED) {
      dispatch(fetchValues(filter.id))
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FiltersGroup)
