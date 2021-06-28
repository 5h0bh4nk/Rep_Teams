import React, { Component } from 'react'
import Video from './Containers/Room/Video'
import MakeRoom from './Containers/MeetStart/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Containers/Homepage/Homepage';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import dashboard from './Containers/Dashboard/Dashboard';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/room" exact component={MakeRoom} />
						<Route exact path = "/home" component = {Home} />
						<Route exact path = "/login" component = {Login} />
						<Route exact path = "/signup" component = {Signup} />
						<Route exact path = "/dashboard" component = {dashboard} />
						<Route path="/room/:url" component={Video} />
						<Route>{'404'}</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;