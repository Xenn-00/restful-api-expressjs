import supertest from "supertest"
import { createManyTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, loginTestUser, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { logger } from "../../src/app/logging.js"
import { web } from "../../src/app/web.js"

describe("GET /api/contacts/:contactId/address", function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createManyTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can get list of addresses", async function () {
        const token = await loginTestUser()
        const contact = await getTestContact()
        const result = await supertest(web)
            .get(`/api/contacts/${contact.id}/address`)
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBeDefined()
    })
})