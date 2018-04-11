import React from 'react'
//import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import {store} from './store/store'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/mainpage'
import Main from './config/router'


const App = () => (
  <div>
    <Header />
    <Main />
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