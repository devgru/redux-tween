import {bindActionCreators} from 'redux'

export default function mapActionCreators(actionCreators) {
  return function (dispatch) {
    return bindActionCreators(actionCreators, dispatch)
  }
}
