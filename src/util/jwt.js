import jwt from "jsonwebtoken"
import { ResponseError } from "../error/response.error.js"

const sign = (user, secret_token) => {
    const accessToken = jwt.sign(user, secret_token, { expiresIn: "7d" })
    return accessToken
}

const verify = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) throw new ResponseError(401, "Unauthorized")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new ResponseError(403, "Unauthorized")
        req.user = user
        next()
    })
}

export {
    sign,
    verify
}