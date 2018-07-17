// Reducer
function counter(state = { count: 0 }, action) {
	const count = state.count
	switch (action.type) {
		case 'increase':
			return { count: count + 1 }
		default:
		return state
		}
}

function todolist(state = [], action){
	switch (action.type) {
		case 'add_item':
			return [...state, {
				id:action.id,
				text:action.text,
				completed:action.completed
			}]
		case 'show_item' : 
			return state.map(todo =>
        		(todo.id === action.id) ? {...todo, completed: todo.completed} : todo
      		)
      	case 'done_item' : 
			return state.map(todo =>
        		(todo.id === action.id) ? {...todo, completed: !todo.completed} : todo
      		)
    default:
      return state
	}
}

function navchooser(state = {id:null, chooseid:null }, action){
	switch (action.type) {	
		case 'nav_choose': 
			if(action.id === 1)
				return{
					id:action.id,
					chooseid:'first'}
			if(action.id === 2)
				return{
					id:action.id,
					chooseid:'second'}
			if(action.id === 3)
				return{
					id:action.id,
					chooseid:'third'}
			else
				return state	
	default:
		return state
	}
}

export default {counter, todolist,navchooser}