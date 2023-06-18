import supertest from "supertest"
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, loginTestUser, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { logger } from "../../src/app/logging.js"
import { web } from "../../src/app/web.js"

describe("DELETE /api/contacts/:contactId/address/:addressId", function () {
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

    it("should can get contact", async function () {
        const token = await loginTestUser()
        const contact = await getTestContact()
        let address = await getTestAddress()
        const result = await supertest(web)
            .delete(`/api/contacts/${contact.id}/address/${address.id}`)
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        address = await getTestAddress()
        expect(address).toBeNull()
    })
})