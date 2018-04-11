import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Roster from './../components/Roster'
import Home from './../components/Home'
import Schedule from './../components/Schedule'
import Counter from './../components/Counter'

// const Main = () => (
//   <main>
//     <Switch>
//       <Route exact path='/' component={Home}/>
//       <Route path='/roster' component={Roster}/>
//       <Route path='/schedule' component={Schedule}/>
//       <Route path='/Counter' component={Counter}/>
//     </Switch>
//   </main>
// )

const Main = function(){
	return(
	  <main>
	    <Switch>
	      <Route exact path='/' component={Home}/>
	      <Route path='/roster' component={Roster}/>
	      <Route path='/schedule' component={Schedule}/>
	      <Route path='/Counter' component={Counter}/>
	    </Switch>
	  </main>
	)
} 

export default Main

