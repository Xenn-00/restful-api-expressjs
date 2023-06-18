import supertest from "supertest"
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, loginTestUser, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe("PUT /api/contacts/:contactId/address/:addressId", function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can update address", async function () {
        const token = await loginTestUser()
        const contact = await getTestContact()
        const address = await getTestAddress()

        const result = await supertest(web)
            .put(`/api/contacts/${contact.id}/address/${address.id}`)
            .set("Authorization", token)
            .send({
                street: "test",
                country: "Country J",
                postal_code: "55281"
            })
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.street).toBe("test")
        expect(result.body.data.postal_code).toBe("55281")
    })
})