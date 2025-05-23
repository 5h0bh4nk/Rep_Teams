import {React, useState} from 'react'
import './Signup.css';
import {baseUrl} from '../../shared/basUrl';

function Signup(props) {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const RegisterUser = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        
        try {
            const response = await fetch(baseUrl + 'users/signup', requestOptions);
            const result = await response.json();
            
            if (result.err) {
                setErrors({ general: result.err.message });
                setSuccessMessage('');
            } else {
                setSuccessMessage(result.status);
                setErrors({});
                // Auto close after success
                setTimeout(() => {
                    toggleModal();
                }, 2000);
            }
        } catch (error) {
            setErrors({ general: 'Network error. Please try again.' });
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        // Clear errors when user starts typing
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ''});
        }
    }

    const validateForm = (data) => {
        const newErrors = {};
        
        if (!data.name || data.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }
        
        if (!data.username || data.username.trim().length < 3) {
            newErrors.username = 'Username must be at least 3 characters long';
        }
        
        if (!data.password || data.password.length <= 5) {
            newErrors.password = 'Password must be more than 5 characters long';
        }
        
        if (!data.cpassword) {
            newErrors.cpassword = 'Please confirm your password';
        } else if (data.password !== data.cpassword) {
            newErrors.cpassword = 'Passwords do not match';
        }
        
        return newErrors;
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');
        
        const formValidation = validateForm(formData);
        
        if (Object.keys(formValidation).length > 0) {
            setErrors(formValidation);
            setIsLoading(false);
            return;
        }
        
        await RegisterUser(formData);
        setIsLoading(false);
    }

    const toggleModal = () => props.setSignin(!props.sign);

    if (!props.sign) return null;

    return (
        <div className="signup-modal">
            <div className="signup-card">
                <button 
                    className="close-button" 
                    onClick={toggleModal}
                    aria-label="Close signup modal"
                >
                    ×
                </button>
                
                <div className="signup-header">
                    <h2 className="signup-title">Create your account</h2>
                    <p className="signup-subtitle">Join us to start collaborating with your team</p>
                </div>

                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Full Name
                        </label>
                        <input 
                            className={`form-control ${errors.name ? 'error' : ''}`}
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            Username
                        </label>
                        <input 
                            className={`form-control ${errors.username ? 'error' : ''}`}
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Choose a unique username"
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                        {errors.username && <div className="error-message">{errors.username}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className={`form-control ${errors.password ? 'error' : ''}`}
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Create a strong password"
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="cpassword">
                            Confirm Password
                        </label>
                        <input 
                            className={`form-control ${errors.cpassword ? 'error' : ''}`}
                            type="password" 
                            name="cpassword" 
                            id="cpassword" 
                            placeholder="Confirm your password"
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        {errors.cpassword && <div className="error-message">{errors.cpassword}</div>}
                    </div>

                    {errors.general && (
                        <div className="error-message">{errors.general}</div>
                    )}

                    {successMessage && (
                        <div className="success-message">{successMessage}</div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Creating account...
                            </>
                        ) : (
                            'Create account'
                        )}
                    </button>
                </form>

                <div className="form-footer">
                    <span>Already have an account? </span>
                    <a href="#" className="form-link">
                        Sign in instead
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Signup