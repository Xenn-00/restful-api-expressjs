import supertest from "supertest"
import { createTestUser, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should be can login', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "Fuma",
                password: "Wazxse34"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "",
                password: "Wazxse34"
            })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "Fuma",
                password: "Wazxs34"
            })

        logger.info(result.body)
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "Uproar",
                password: "Wazxse34"
            })

        logger.info(result.body)
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })


})