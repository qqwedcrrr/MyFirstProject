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

function processclick(state = {current:null},action){
	switch (action.type) {
		case 'process_drop':
			return{
				current:action.position
			}
		default:
			return state
	}
}

function volumeclick(state = {volume:null}, action){
	switch(action.type) {
		case 'volume_drag':
			return{
				volume:action.volume
			}
		default:
			return state
	}
}

function songclick(state={id:0}, action){
	switch(action.type) {
		case'song_click':
			return{
				id: action.id
			}
		default:
			return state
	}
}

function songlistclose(state={liststatus:'hidden'},action){
	switch(action.type) {
		case 'songlist_close':
			return{
				liststatus:'hidden'
			}
		case 'songlist_open':
			return{
				liststatus:'visible'
			}
		default:
			return state
	}	
}

function login(state={login:false},action){
	if(action.type === 'login')
		return{
			login:true
		}
	else
		return state
}

export default {counter, todolist,navchooser, processclick,volumeclick,songclick,songlistclose,login}