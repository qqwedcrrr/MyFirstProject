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
function mapcurrentTime(state) {
	return {
		position: state.processclick.current,
		volume: state.volumeclick.volume,
		songid: state.songclick.id,
		songliststatus:state.songlistclose.liststatus
	}
}

function mapStateToProps(state) {
	return {
		value: state.counter.count,
		todolist:state.todolist,
		chooseid: state.navchooser
	}
}

function mapLoginPopOut(state){
	return{
		login:state.login.login
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



export {store, mapDispatchToProps, mapStateToProps ,mapcurrentTime,mapLoginPopOut}