import supertest from "supertest"
import { createTestUser, loginTestUser, removeTestUser } from "./test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe("GET /api/users/current", function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it("should can get current user", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .get('/api/users/current')
            .set("Authorization", token)

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Fuma")
        expect(result.body.data.name).toBe("Fuma zakko")
    })
})