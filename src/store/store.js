import { createStore, applyMiddleware, combineReducers } from 'redux'
import {increaseAction, doneitem, navchoose} from './../action/action'
import reducer from './../reducer/reducer'
import thunk from 'redux-thunk';


// Store
const store = createStore(
	combineReducers(reducer),
	applyMiddleware(thunk)
	)
// Map Redux state to component props
function mapStateToProps(state) {
	return {
		value: state.counter.count,
		todolist:state.todolist,
		chooseid: state.navchooser
	}
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick: () => dispatch(increaseAction),
		DoneitemClick: id => dispatch(doneitem(id)),
		navClick: id => dispatch(navchoose(id))

	}
}

export {store, mapDispatchToProps, mapStateToProps}