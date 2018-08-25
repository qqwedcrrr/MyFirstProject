import React from 'react';
import { Switch,
    Route,
    Link
     } from 'react-router-dom';

import Loadable from 'react-loadable';

const loadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
      return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
      return null;
  }
};

const Home = Loadable({
  loader: () => import('./../components/Home'),
  loading: loadingComponent
});

const Roster= Loadable({
  loader: () => import('./../components/Roster'),
  loading: loadingComponent
});

const Schedule= Loadable({
  loader: () => import('./../components/Schedule'),
  loading: loadingComponent
});

const Counter= Loadable({
  loader: () => import('./../components/Counter'),
  loading: loadingComponent
});

const Todo= Loadable({
  loader: () => import('./../components/Todolist'),
  loading: loadingComponent
});

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
	<div>
	    <Switch>
			<Route exact path='/' component={Home}/>
	     	<Route path='/roster' component={Roster}/>
	     	<Route path='/schedule' component={Schedule}/>
	     	<Route path='/Counter' component={Counter}/>
	     	<Route path='/Todo' component={Todo}/>	
	    </Switch>
	</div>
	)
} 

export default Main

