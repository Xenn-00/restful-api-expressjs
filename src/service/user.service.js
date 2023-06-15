import { registerUserValidation } from "../validation/user.validation.js"
import { validate } from "../validation/validation.js"
import { primaclient } from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import bcrypt from "bcrypt"

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

export default {
    register
}