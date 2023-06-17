import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, loginTestUser, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"
import crypto from "crypto"

describe("DELETE /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can get contact", async function () {
        const token = await loginTestUser()
        let contact = await getTestContact()
        const result = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        contact = await getTestContact()
        expect(contact).toBeNull()
    })
    it("should reject if contact is not found", async function () {
        const token = await loginTestUser()
        const contactId = crypto.randomUUID()
        const result = await supertest(web)
            .delete(`/api/contacts/${contactId}`)
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})