import React, { Component } from 'react'
import Video from './Containers/Room/Video'
import Home from './Containers/Homepage/Homepage';
import Dashboard from './Containers/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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

class AppContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenValidated: false,
			isValidating: false
		};
	}

	validateToken = async () => {
		if (!this.props.auth.token || this.state.isValidating) return;
		
		this.setState({ isValidating: true });
		
		try {
			const myHeaders = new Headers();
			myHeaders.append('Authorization', 'bearer ' + localStorage.getItem("token"));
			myHeaders.append('Content-Type', 'application/json');
			
			const response = await fetch(baseUrl + 'users/checkJWTToken', {
				method: 'GET',
				headers: myHeaders
			});
			
			const data = await response.json();
			console.log("Token validation:", data);
			
			if (!data.success && !data.error) {
				this.props.logoutUser();
			} else {
				this.setState({ tokenValidated: true });
			}
		} catch (error) {
			console.error("Token validation error:", error);
			// Don't logout on network errors, just log them
		} finally {
			this.setState({ isValidating: false });
		}
	}

	componentDidMount() {
		this.validateToken();
	}

	componentDidUpdate(prevProps) {
		// Only validate token if authentication state changed
		if (prevProps.auth.token !== this.props.auth.token) {
			if (this.props.auth.token) {
				this.setState({ tokenValidated: false });
				this.validateToken();
			} else {
				this.setState({ tokenValidated: false });
			}
		}
	}

	render() {
		const HomePage = () => {
			return(
				<Home auth={this.props.auth} 
					loginUser={this.props.loginUser} 
					logoutUser={this.props.logoutUser} 
				/>
			);
		}

		const Mydashboard = () => {
			return(
				<Dashboard logoutUser={this.props.logoutUser} auth={this.props.auth} />
			);
		}

		const MyRoom = () => {
			return(
				<Video auth={this.props.auth} />
			);
		}

		const Messenger = () => {
			return(
				<ChatApp auth={this.props.auth} logoutUser={this.props.logoutUser}/>
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

		// Show loading state while validating token
		if (this.props.auth.token && !this.state.tokenValidated && this.state.isValidating) {
			return (
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					fontSize: '18px',
					color: '#6264a7'
				}}>
					Validating session...
				</div>
			);
		}

		return (
			<Route render={({ location }) => (
				<TransitionGroup>
					<CSSTransition key={location.key} classNames="page" timeout={300}>
						<Switch location={location}>
							<Route exact path="/home" component={HomePage} />
							<PrivateRoute exact path="/dashboard" component={Mydashboard} />
							<PrivateRoute path="/room/:roomId" component={MyRoom} />
							<PrivateRoute path="/conversations" component={Messenger} />
							<PrivateRoute path="/conversations/:roomId" component={Messenger} />
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)} />
		)
	}
}

const ConnectedAppContent = connect(mapStateToProps, mapDispatchToProps)(AppContent);

function App() {
	return (
		<Router>
			<ConnectedAppContent />
		</Router>
	);
}

export default App;