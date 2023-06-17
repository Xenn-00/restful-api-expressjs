import supertest from "supertest"
import { createManyTestContact, createTestUser, getTestContact, loginTestUser, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe("GET /api/contacts/", function () {
    beforeEach(async () => {
        await createTestUser()
        await createManyTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can search without params", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .get("/api/contacts/")
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })

    it("should can search to page 2", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .get("/api/contacts/")
            .query({
                page: 2
            })
            .set("Authorization", token)

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
})