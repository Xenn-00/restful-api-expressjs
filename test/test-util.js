import { primaclient } from "../src/app/database.js"
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

const removeAllTestContacts = async () => {
    await primaclient.contact.deleteMany({
        where: {
            username: "Fuma"
        }
    })
}

const createTestContact = async () => {
    await primaclient.contact.create({
        data: {
            username: "Fuma",
            first_name: "Fuma",
            last_name: "zakko",
            email: "fumaZakko@hololiven.com",
            phone: "+81267122387"
        }
    })
}
const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await primaclient.contact.create({
            data: {
                username: "Fuma",
                first_name: `Fuma ${i}`,
                last_name: `zakko ${i}`,
                email: "fumaZakko@hololiven.com",
                phone: "+81267122387"
            }
        })
    }
}
const getTestContact = async () => {
    return primaclient.contact.findFirst({
        where: {
            username: "Fuma"
        },
    })
}

const removeAllTestAddresses = async () => {
    await primaclient.address.deleteMany({
        where: {
            contact: {
                username: "Fuma"
            }
        }
    })
}

const createTestAddress = async () => {
    const contact = await getTestContact()
    await primaclient.address.create({
        data: {
            contact_id: contact.id,
            street: "Test street",
            city: "City A",
            province: "Province B",
            country: "Country J",
            postal_code: "62217"
        }
    })
}

const createManyTestAddress = async () => {
    const contact = await getTestContact()
    for (let i = 1; i < 4; i++) {
        await primaclient.address.create({
            data: {
                contact_id: contact.id,
                street: `Test street ${i}`,
                city: `City A ${1}`,
                province: "Province B",
                country: "Country J",
                postal_code: "62217"
            }
        })
    }
}

const getTestAddress = async () => {
    const contact = await getTestContact()
    return primaclient.address.findFirst({
        where: {
            contact_id: contact.id
        }
    })
}

export {
    removeTestUser,
    createTestUser,
    loginTestUser,
    getTestUser,
    createTestContact,
    getTestContact,
    removeAllTestContacts,
    createManyTestContact,
    removeAllTestAddresses,
    createTestAddress,
    getTestAddress,
    createManyTestAddress
}