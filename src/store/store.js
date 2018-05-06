import { createStore, applyMiddleware, combineReducers } from 'redux'
import {increaseAction, doneitem} from './../action/action'
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
		todolist:state.todolist
	}
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick: () => dispatch(increaseAction),
		DoneitemClick: id => dispatch(doneitem(id))
	}
}

export {store, mapDispatchToProps, mapStateToProps}