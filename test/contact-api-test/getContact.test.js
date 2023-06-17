import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, loginTestUser, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe("GET /api/contacts/:contactId", function () {
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
        const contactId = await getTestContact()
        const result = await supertest(web)
            .get(`/api/contacts/${contactId.id}`)
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(contactId.id)
        expect(result.body.data.first_name).toBe("Fuma")
    })
})