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

