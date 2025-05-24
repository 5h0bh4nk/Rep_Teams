module.exports = {
    'secretKey': process.env.JWT_SECRET || '12345-67890-09876-54321',
    'mongoUrl': process.env.MONGO_URL || 'mongodb://localhost:27017/shubhmeet',
    'facebook': {
        clientId: 'Your Facebook App ID',
        clientSecret: 'Your Facebook App Secret'
    }
}
