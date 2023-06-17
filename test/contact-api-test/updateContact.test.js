import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, loginTestUser, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"
import crypto from "crypto"

describe("PUT /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can update existing contact", async function () {
        const token = await loginTestUser()
        const contact = await getTestContact()
        const result = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("Authorization", token)
            .send({
                first_name: "Fuma",
                last_name: "Zakko",
                email: "fuma_zakko21@hololive.com",
                phone: "+81267122389"
            })
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.email).toBe("fuma_zakko21@hololive.com")
        expect(result.body.data.phone).toBe("+81267122389")

    })

    it("should can reject if request is invalid", async function () {
        const token = await loginTestUser()
        const contact = await getTestContact()
        const result = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("Authorization", token)
            .send({
                first_name: "Fuma",
                last_name: "Zakko",
                email: "fuma_zakko21@hololivecom",
                phone: "+81267122389"
            })
        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()

    })
    it("should can reject if contact is not found", async function () {
        const token = await loginTestUser()
        const contactId = crypto.randomUUID()
        const result = await supertest(web)
            .put(`/api/contacts/${contactId}`)
            .set("Authorization", token)
            .send({
                first_name: "Fuma",
                last_name: "Zakko",
                email: "fuma_zakko21@hololive.com",
                phone: "+81267122389"
            })
        logger.info(result.body)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()

    })
})