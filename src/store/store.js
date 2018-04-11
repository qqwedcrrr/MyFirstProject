import { createStore, applyMiddleware } from 'redux'
import increaseAction from './../action/action'
import counter from './../reducer/reducer'
import thunk from 'redux-thunk';


// Store
const store = createStore(
	counter,
	applyMiddleware(thunk)
	)
// Map Redux state to component props
function mapStateToProps(state) {
	return {
		value: state.count
	}
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick: () => dispatch(increaseAction)
	}
}

export {store, mapDispatchToProps, mapStateToProps}