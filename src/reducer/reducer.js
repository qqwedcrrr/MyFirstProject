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

export default {counter, todolist}