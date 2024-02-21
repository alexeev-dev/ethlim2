import {connect} from 'react-redux'

import {UserInfo} from 'components/header'

const stats = [
  {value: 42896, label: 'views'},
  {value: 428, label: 'corrections'},
  {value: 4.8, label: 'rating'}
]

const mapStateToProps = (state) => ({
  ava: '',
  name: 'Vadim Alexeev',
  email: 'html5css3.pro@gmail.com',
  stats,
})

export default connect(
  mapStateToProps,
  null
)(UserInfo)
