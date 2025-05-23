// API Base URL Configuration - support production deployment
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.hostname === '192.168.1.9';

// Check for environment variable first, then fall back to hostname detection
let API_URL;
if (process.env.REACT_APP_API_URL) {
    API_URL = process.env.REACT_APP_API_URL;
} else if (isDevelopment) {
    const API_BASE = window.location.hostname === '192.168.1.9' ? 
                    'http://192.168.1.9:4001/api' : 
                    'http://localhost:4001/api';
    API_URL = API_BASE;
} else {
    // Production fallback - same domain
    API_URL = '/api';
}

// Ensure the URL always ends with a trailing slash
if (!API_URL.endsWith('/')) {
    API_URL += '/';
}

export const baseUrl = API_URL;