import React, { Component, useState } from 'react'
import Video from './Containers/Room/Video'
import Home from './Containers/Homepage/Homepage';
import dashboard from './Containers/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './redux/ActionCreators';

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
	constructor(props){
		super(props);
		this.state = {
			visible: true
		};
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

		const onDismiss = () => {
			this.state.visible = !this.state.visible;
		}

		return (
			<div>
				{
					(this.props.auth.errMess)?
					<Alert color="info" isOpen={this.state.visible} toggle={onDismiss}>
						I am an alert and I can be dismissed!
				  	</Alert>
					  :
					null
				}
				<Router>
					<TransitionGroup>
						<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
							<Switch>
								<Route exact path = "/home" component = {HomePage} />
								<PrivateRoute exact path = "/dashboard" component = {dashboard} />
								<PrivateRoute path="/room/:url" component={Video} />
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