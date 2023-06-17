import addressService from "../service/address.service.js"

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        console.log("req.body : ", request)
        const contactId = req.params.contactId
        const result = await addressService.create(user, contactId, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create
}