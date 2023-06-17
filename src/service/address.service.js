import { primaclient } from "../app/database.js"
import { getContactValidation } from "../validation/contact.validation.js"
import { validate } from "../validation/validation.js"
import { ResponseError } from "../error/response.error.js"
import { createAddressValidation } from "../validation/address.validation.js"
import crypto from "crypto"

const create = async (user, contactId, request) => {
    contactId = validate(getContactValidation, contactId)
    console.log("service hit")
    const countCountact = await primaclient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })
    if (countCountact !== 1) throw new ResponseError(404, "Contact is not found")

    const address = validate(createAddressValidation, request)
    address.contact_id = contactId
    address.id = crypto.randomUUID()
    return primaclient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export default {
    create
}