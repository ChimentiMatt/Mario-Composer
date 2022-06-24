const jwt = require("jsonwebtoken")

const User = require("../models/User")

const jwtMiddlewere = async (req, res, next) => {
    const authorization = req.header("Authorization") || ""
    const [type, token] = authorization.split(" ")
    try {
        if(type === "Bearer" && jwt.verify(token, process.env.SECRET_KEY)){
            const payload = jwt.decode(token, process.env.SECRET_KEY)
            const user = await User.findById(payload._id)
            req.user = user.sanitize()
            next()
        } else {
            // res.status(403).send({ errors: ["Unauthorized"]})
            req.user = {}
            next()
        }
    } catch(err) {
        res.status(403).send({errors: [err]})

    }
}

module.exports = jwtMiddlewere