import React, { Component } from 'react'
import Video from './Containers/Room/Video'
import MakeRoom from './Containers/MeetStart/Home'
import Home from './Containers/Homepage/Homepage';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import dashboard from './Containers/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './redux/ActionCreators';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
	loginUser: (creds) => dispatch(loginUser(creds)),
	logoutUser: () => dispatch(logoutUser())
});


class App extends Component {
	render() {

		const HomePage = () =>{
			return(
				<Home auth={this.props.auth} 
					loginUser={this.props.loginUser} 
					logoutUser={this.props.logoutUser} 
				/>
			);
		}


		const PrivateRoute = ({ component: Component, ...rest }) => (
			<Route {...rest} render={(props) => (
			  this.props.auth.isAuthenticated
				? <Component {...props} />
				: <Redirect to={{
					pathname: '/home',
					state: { from: props.location }
				  }} />
			)} />
		);

		return (
			<div>
				<Router>
					<TransitionGroup>
						<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
							<Switch>
								<Route path="/room" exact component={MakeRoom} />
								<Route exact path = "/home" component = {HomePage} />
								{/* <Route exact path = "/login" component = {Login} />
								<Route exact path = "/signup" component = {Signup} /> */}
								<PrivateRoute exact path = "/dashboard" component = {dashboard} />
								<Route path="/room/:url" component={Video} />
								<Redirect to="/home" />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</Router>		
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));