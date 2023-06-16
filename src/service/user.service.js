import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user.validation.js"
import { validate } from "../validation/validation.js"
import { primaclient } from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import bcrypt from "bcrypt"
import { sign } from "../util/jwt.js"


const register = async (req) => {
    const user = validate(registerUserValidation, req)

    const countUser = await primaclient.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser) throw new ResponseError(400, "Username already exist")

    user.password = await bcrypt.hash(user.password, 10)

    return primaclient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        }
    })
}

const login = async (req) => {
    const loginRequest = validate(loginUserValidation, req)
    const user = await primaclient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    })
    if (!user) throw new ResponseError(401, "Username or password wrong")

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
    if (!isPasswordValid) throw new ResponseError(401, "Username or password wrong")
    const token = sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET)
    return primaclient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })
}

const get = async (username) => {
    username = validate(getUserValidation, username)
    const user = await primaclient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    })
    if (!user) throw new ResponseError(404, "User is not found")

    return user
}

const update = async (req) => {
    const user = validate(updateUserValidation, req)
    const countUser = await primaclient.user.count({
        where: {
            username: user.username
        }
    })
    if (countUser !== 1) throw new ResponseError(404, "User is not found")
    const data = {}
    if (user.name) {
        data.name = user.name
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }
    return primaclient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username)

    const user = await primaclient.user.findUnique({
        where: {
            username: username
        }
    })
    if (!user) throw new ResponseError(404, "User is not found")

    return primaclient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout,
}