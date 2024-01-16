
const UserService = require('../services/UserService')

async function checkAuth(req, res, next) {
    try {

        const userData = await UserService.validateToken(req.cookies.auth)
        // console.log(req.cookies.auth);
        // console.log(userData, "*****************************");
        // console.log(userData.id);
        const user = await UserService.findById(userData.id)
        req.user = user
        next()
    } catch(e) {
        res.status(403).send(
            "No auth"
        )
    }
}

module.exports = checkAuth