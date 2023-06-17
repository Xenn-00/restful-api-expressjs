import crypto from "crypto"
import { primaclient } from "../app/database.js"
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact.validation.js"
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

const update = async (user, request) => {
    const contact = validate(updateContactValidation, request)
    const countContact = await primaclient.contact.count({
        where: {
            username: user.username,
            id: contact.id
        }
    })

    if (countContact !== 1) throw new ResponseError(404, "Contact is not found")
    return primaclient.contact.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone

        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const remove = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)

    const countContact = await primaclient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })
    if (countContact !== 1) throw new ResponseError(404, "Contact is not found")
    return primaclient.contact.delete({
        where: {
            id: contactId
        }
    })
}

const search = async (user, request) => {
    request = validate(searchContactValidation, request)
    const skip = (request.page - 1) * request.size

    const filters = []
    filters.push({
        username: user.username
    })
    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name,
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        })
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }
    if (request.phone) {
        filters.push(
            {
                phone: {
                    contains: request.phone
                }
            }
        )
    }
    const contacts = await primaclient.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    })
    const countItems = await primaclient.contact.count({
        where: {
            AND: filters
        }
    })
    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: countItems,
            total_page: Math.ceil(countItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}