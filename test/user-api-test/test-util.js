import { primaclient } from "../../src/app/database.js"
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const removeTestUser = async () => {
    await primaclient.user.deleteMany({
        where: {
            username: "Fuma"
        }
    })
}

const createTestUser = async () => {
    await primaclient.user.create({
        data: {
            username: "Fuma",
            password: await bcrypt.hash("Wazxse34", 10),
            name: "Fuma zakko",
            token: "test"
        }
    })
}

const loginTestUser = async () => {
    const user = {
        username: "Fuma",
        password: "Wazxse34"
    }
    const login = await primaclient.user.findUnique({
        where: {
            username: user.username
        },
        select: {
            username: true,
            password: true
        }
    })
    const isPasswordValid = await bcrypt.compare(user.password, login.password)
    if (!isPasswordValid) throw new ResponseError(401, "Username or password wrong")
    const token = jwt.sign({ username: login.username }, process.env.ACCESS_TOKEN_SECRET)
    const result = await primaclient.user.update({
        data: {
            token: token
        },
        where: {
            username: login.username
        },
        select: {
            token: true
        }
    })

    return result.token
}

const getTestUser = async () => {
    return primaclient.user.findUnique({
        where: {
            username: "Fuma"
        }
    })
}

export {
    removeTestUser,
    createTestUser,
    loginTestUser,
    getTestUser
}