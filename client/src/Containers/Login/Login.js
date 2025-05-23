import {React, useState, useEffect} from 'react';
import './Login.css'

function Login(props) {
    const [formdata, setformData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Reset form data when modal opens
        setformData({});
        setIsLoading(false);
        
        // Cleanup function
        return () => {
            setIsLoading(false);
        };
    }, [props.login]);

    const handleChange = (e) => {
        setformData({...formdata, [e.target.name] : e.target.value});
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (isLoading) return; // Prevent double submission
        
        setIsLoading(true);
        
        try {
            await props.loginUser(formdata);
            // Only close modal on successful login
            if (props.auth?.isAuthenticated) {
                toggleModal();
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    }
  
    const toggleModal = () => {
        if (!isLoading) { // Prevent closing during loading
            props.setLogin(!props.login);
        }
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && !isLoading) {
                toggleModal();
            }
        };

        if (props.login) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [props.login, isLoading]);

    if (!props.login) return null;

    return (
        <div className="login-modal">
            <div className="login-card">
                <button 
                    className="close-button" 
                    onClick={toggleModal}
                    aria-label="Close login modal"
                >
                    ×
                </button>
                
                <div className="login-header">
                    <h2 className="login-title">Welcome back</h2>
                    <p className="login-subtitle">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            Username
                        </label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="username" 
                            onChange={handleChange} 
                            id="username" 
                            required 
                            placeholder="Enter your username"
                            autoComplete="username"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="form-control" 
                            type="password" 
                            name="password" 
                            onChange={handleChange} 
                            id="password" 
                            required 
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    {props.auth?.errMess && (
                        <div className="error-message">
                            Invalid credentials. Please try again.
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>

                <div className="form-footer">
                    <a href="#" className="form-link">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login
