import React, {Component} from 'react' 
import PropTypes from 'prop-types'
import Addtodo from './Addtodo'
import { connect } from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from '../store/store'


class Todoitem extends Component {
	render() {
		const {text, completed,onClick} = this.props
		return (
			<li
			style = {{
				textDecoration: completed ? 'line-through' : 'none'
			}}
			onClick={onClick}

			>
			{text}
			</li>
		)
	}
}
Todoitem.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}


class TodoList extends Component {
	render() {
		const { todolist, DoneitemClick} = this.props;
		if(todolist.length < 1)
			return null
		else
			return (
				<ul>
					{
						todolist.map(todo => (
						<Todoitem key={todo.id} {...todo} onClick={e =>{DoneitemClick(todo.id)}} />
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