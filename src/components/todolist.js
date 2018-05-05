import React, {Component} from 'react' 
import PropTypes from 'prop-types'
import Addtodo from './Addtodo'
import { connect } from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from '../store/store'

const Todoitem = item => (
	<li
		style = {{
			textDecoration: item.completed ? 'line-through' : 'none'
		}}
	>
		{item.text}
	</li>
	) 

Todoitem.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}


class TodoList extends Component {
	render() {
		const { todolist} = this.props;
		console.log(todolist)
		if(todolist.length < 1)
			return null
		else
			return (
				<ul>
					{
						todolist.map(todo => (
						<Todoitem key={todo.id} {...todo} />
						))
					}
				</ul>
			)
	}
}


// TodoList.propTypes = {
//   todolist: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       completed: PropTypes.bool.isRequired,
//       text: PropTypes.string.isRequired
//     }).isRequired
//   ).isRequired,
// }

TodoList = connect(
	mapStateToProps,
	mapDispatchToProps
	)(TodoList)

const Todo = () => (
	<div>
		<TodoList>
			<Todoitem />
		</TodoList>
		<Addtodo />
	</div>
)



export default Todo