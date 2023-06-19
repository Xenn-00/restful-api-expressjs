import { primaclient } from "../app/database.js"
import { getContactValidation } from "../validation/contact.validation.js"
import { validate } from "../validation/validation.js"
import { ResponseError } from "../error/response.error.js"
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address.validation.js"
import crypto from "crypto"

const checkContactExist = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)
    const countCountact = await primaclient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })
    if (countCountact !== 1) throw new ResponseError(404, "Contact is not found")

    return contactId
}

const create = async (user, contactId, request) => {
    contactId = await checkContactExist(user, contactId)

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

const get = async (user, contactId, addressId) => {
    contactId = await checkContactExist(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const address = await primaclient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if (!address) throw new ResponseError(404, "Address is not found")
    return address
}

const update = async (user, contactId, request) => {
    contactId = await checkContactExist(user, contactId)
    const address = validate(updateAddressValidation, request)

    const countAddress = await primaclient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    })

    if (countAddress !== 1) throw new ResponseError(404, "Address not found")

    return primaclient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code
        },
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

const list = async (user, contactId) => {
    contactId = await checkContactExist(user, contactId)

    const address = await primaclient.address.findMany({
        where: {
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
    return address
}

const remove = async (user, contactId, addressId) => {
    contactId = await checkContactExist(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    return primaclient.address.delete({
        where: {
            id: addressId
        }
    })
}

export default {
    create,
    get,
    update,
    list,
    remove
}