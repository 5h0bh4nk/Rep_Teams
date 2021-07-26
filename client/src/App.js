import React, { Component } from 'react'
import Video from './Containers/Room/Video'
import Home from './Containers/Homepage/Homepage';
import Dashboard from './Containers/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './redux/ActionCreators';
import {baseUrl} from './shared/basUrl';
import ChatApp from './Messenger/App/index';

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
		if(!this.props.auth.token) return;

		const myHeaders = new Headers();
		myHeaders.append('Authorization', 'bearer '+localStorage.getItem("token"));
		myHeaders.append('Content-Type', 'application/json');
		
		fetch(baseUrl+'users/checkJWTToken',{
			method: 'GET',
			headers: myHeaders
		})
		.then(response => response.json())
		.then(data =>{
			console.log("data",data);
			if(!data.success && !data.error){
				this.props.logoutUser();
				console.log("khatam");
				this.props.history.push("/home");
			}
		});
	}
	componentDidUpdate() {
		if(!this.props.auth.token) return;
		
		const myHeaders = new Headers();
		myHeaders.append('Authorization', 'bearer '+localStorage.getItem("token"));
		myHeaders.append('Content-Type', 'application/json');
		
		fetch(baseUrl + 'users/checkJWTToken',{
			method: 'GET',
			headers: myHeaders
		})
		.then(response => response.json())
		.then(data =>{
		console.log("data",data);
		if(!data.success && !data.error){
				this.props.logoutUser();
				this.props.history.push("/home");
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

		const Messenger = () =>{
			return(
				<ChatApp auth = {this.props.auth} logoutUser={this.props.logoutUser}/>
			)
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
								<PrivateRoute path="/room/:roomId" component={MyRoom}  />
								<PrivateRoute path="/conversations" component={Messenger} />
								<PrivateRoute path="/conversations/:roomId" component={Messenger} />
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