import supertest from "supertest"
import { createTestUser, getTestUser, loginTestUser, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"


describe("DELETE /api/users/logout", function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it("should can logout", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set("Authorization", token)

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        const user = await getTestUser()
        expect(user.token).toBeNull()
    })
})