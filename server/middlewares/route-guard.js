const checkRole = (...admitedRoles) => (req, res, next) => {

    if (admitedRoles.includes(req.payload.role)) {
        next()
    } else {
        res.status(401).json({ message: 'You are not allowed' })
    }
}

module.exports = {
    checkRole,
}