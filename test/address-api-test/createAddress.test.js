import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, loginTestUser, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe("POST /api/contacts/:contactId/address", function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can create address", async function () {
        const token = await loginTestUser()
        const contact = await getTestContact()
        const result = await supertest(web)
            .post(`/api/contacts/${contact.id}/address`)
            .set("Authorization", token)
            .send({
                street: "Test street",
                city: "City A",
                province: "Province B",
                country: "Country J",
                postal_code: "62217"
            })
        logger.info(result.body)
        logger.debug(contact)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("Test street")
    })

})