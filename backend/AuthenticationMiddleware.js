const isAuthenticated = async (req, res, next) => {
    return !req.session?.userId
        ? res.status(401).json({ error: 'Authentication required' })
        : next()
};

module.exports = isAuthenticated;