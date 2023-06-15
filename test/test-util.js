import { primaclient } from "../src/app/database"
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

export {
    removeTestUser,
    createTestUser
}