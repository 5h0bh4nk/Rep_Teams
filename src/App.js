import React, { Component, useState, useEffect } from 'react'
import Video from './Containers/Room/Video'
import Home from './Containers/Homepage/Homepage';
import Dashboard from './Containers/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './redux/ActionCreators';
import {baseUrl} from './shared/basUrl';

const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
	loginUser: (creds) => dispatch(loginUser(creds)),
	logoutUser: () => dispatch(logoutUser()),
	// alertFade: () => dispatch(alertFade()),
});

class App extends Component {

	componentDidMount() {

		if(this.props.auth.token)
		fetch(baseUrl+'/checkJWT')
			.then(response => response.json())
			.then(data =>{
				if(!data.sucess){
					this.props.logoutUser();
			}
		});
	}
	componentDidUpdate() {
		if(this.props.auth.token)
		fetch(baseUrl+'/checkJWT')
			.then(response => response.json())
			.then(data =>{
				if(!data.sucess){
					this.props.logoutUser();
				}
			});
	}

	render() {
		const HomePage = () =>{
			return(
				<Home auth={this.props.auth} 
					loginUser={this.props.loginUser} 
					logoutUser={this.props.logoutUser} 
				/>
			);
		}

		const Mydashboard = () =>{
			return(
				<Dashboard logoutUser = {this.props.logoutUser} auth = {this.props.auth} />
			);
		}

		const MyRoom = () =>{
			return(
				<Video auth = {this.props.auth} />
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
								<Route exact path = "/home" component = {HomePage} />
								<PrivateRoute exact path = "/dashboard" component = {Mydashboard} />
								<PrivateRoute path="/room/:url" component={MyRoom}  />
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