import supertest from "supertest"
import { createTestUser, getTestUser, loginTestUser, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"
import bcrypt from "bcrypt"

describe("PATCH /api/users/current", function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it("should can update user", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", token)
            .send({
                name: "zakko",
                password: "test123"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Fuma")
        expect(result.body.data.name).toBe("zakko")

        const user = await getTestUser()
        expect(await bcrypt.compare('test123', user.password)).toBe(true)
    })

    it("should can update user name", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", token)
            .send({
                name: "zakko",
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Fuma")
        expect(result.body.data.name).toBe("zakko")
    })

    it("should can update user password", async function () {
        const token = await loginTestUser()
        const result = await supertest(web)
            .patch('/api/users/current')
            .set("Authorization", token)
            .send({
                password: "test123"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Fuma")
        const user = await getTestUser()
        expect(await bcrypt.compare('test123', user.password)).toBe(true)
    })
})