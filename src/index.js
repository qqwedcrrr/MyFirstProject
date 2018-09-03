import React,{Component} from 'react'
//import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import {store} from './store/store'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/mainpage'
import Main from './config/router'
import './index.css'


// class App extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			top:0
// 		}
// 		this.handleWheel = this.handleWheel.bind(this)
// 	}

// 	handleWheel(e){
// 		document.onwheel = e =>{
// 			let screenheight = window.innerHeight
// 			if(e.deltaY>0){
// 				this.setState({
// 					top:this.state.top-80 <= (screenheight-2034) ? (screenheight-2034) : this.state.top-80
// 				})
// 			}else{
// 				this.setState({
// 					top:this.state.top+80 >= 0 ? 0 : this.state.top+80
// 				})
// 			}
// 		}
// 		document.onmouseout = e =>{		
// 			document.onwheel = null;
// 		}
// 	}

// 	render(){
// 		return(
// 			<div ref="mainbody" onMouseOver={this.handleWheel} style={{position:'absolute',top:this.state.top,width:'100%'}}>
//    				<Header />
//     			<Main style={{clear:'both'}} />
//   			</div>
// 		)
// 	}
// }
const App = () =>(
	<div >
   		<Header />
    	<Main style={{clear:'both'}} />
  	</div>
)



ReactDOM.render(
	<Provider store={store}>
	<BrowserRouter>
    	<App />
 </BrowserRouter>
	</Provider>,
	document.getElementById('root')
)