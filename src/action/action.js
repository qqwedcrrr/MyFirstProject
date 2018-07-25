// Action
let Id = 1
export const increaseAction = { type: 'increase' }

export const additem = text => {
	return {
		type:'add_item',
		id:Id++,
		text,
		completed: false
	}
}

export const showitem = { type:'show_item'}

export const doneitem = id => {
	return {
		type:'done_item',
		id
	}
}

export const navchoose = id => {
	return {
		type:'nav_choose',
		id
	}
}

export const processdrop = position =>{
	return {
		type:'process_drop',
		position
	}
}
