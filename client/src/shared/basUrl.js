// API Base URL Configuration - support both localhost and IP access
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '192.168.1.9';
const API_BASE = window.location.hostname === '192.168.1.9' ? 'http://192.168.1.9:4001/api' : 'http://localhost:4001/api';
let API_URL = isDevelopment ? API_BASE : '/api';

// Ensure the URL always ends with a trailing slash
if (!API_URL.endsWith('/')) {
    API_URL += '/';
}

export const baseUrl = API_URL;