import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from '../store/store'




class Counter extends Component {
	render() {
		const { value, onIncreaseClick } = this.props
		return (
			<div>
				<span>{value}</span>
				<button onClick={onIncreaseClick}>Increase</button>
			</div>
		)
	}
}
	Counter.propTypes = {
	value: PropTypes.number.isRequired,
	onIncreaseClick: PropTypes.func.isRequired
	}

// Connected Component

const App = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Counter)

export default App