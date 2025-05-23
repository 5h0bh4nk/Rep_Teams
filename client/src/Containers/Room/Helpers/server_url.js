// Use hostname to determine environment and support mobile access
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '192.168.1.9';
const SERVER_BASE = window.location.hostname === '192.168.1.9' ? 'http://192.168.1.9:4001' : 'http://localhost:4001';
export const server_url = isDevelopment ? SERVER_BASE : 'https://shubh-meet.herokuapp.com/'