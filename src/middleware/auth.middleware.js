import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end()
        }
        req.user = decode
        next()
    })
}