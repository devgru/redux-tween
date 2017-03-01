import {bindActionCreators} from 'redux'

export default actionCreators => dispatch => bindActionCreators(actionCreators, dispatch);
