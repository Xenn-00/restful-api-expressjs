import crypto from "crypto"
import { primaclient } from "../app/database.js"
import { createContactValidation, getContactValidation } from "../validation/contact.validation.js"
import { validate } from "../validation/validation.js"
import { ResponseError } from "../error/response.error.js"

const create = async (user, req) => {
    const contact = validate(createContactValidation, req)
    contact.username = user.username
    contact.id = crypto.randomUUID()
    return primaclient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const get = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)
    const contact = await primaclient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
    if (!contact) throw new ResponseError(404, "Contact is not found")
    return contact
}

export default {
    create,
    get
}