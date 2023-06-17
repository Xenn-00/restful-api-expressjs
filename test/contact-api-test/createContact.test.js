import supertest from "supertest"
import { createTestUser, loginTestUser, removeAllTestContacts, removeTestUser } from "../test-util.js"
import { web } from "../../src/app/web.js"
import { logger } from "../../src/app/logging.js"

describe("POST /api/contacts", function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should can create new contact', async () => {
        const token = await loginTestUser()
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", token)
            .send({
                first_name: "Fuma",
                last_name: "zakko",
                email: "fumaZakko@holoen.com",
                phone: "+81267122387",
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("Fuma")
        expect(result.body.data.last_name).toBe("zakko")
        expect(result.body.data.email).toBe("fumaZakko@holoen.com")
        expect(result.body.data.phone).toBe("+81267122387")
    })

    it('should reject if request is not valid', async () => {
        const token = await loginTestUser()
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", token)
            .send({
                first_name: "",
                last_name: "zakko",
                email: "fumaZakko@hololive.en",
                phone: "+81267122387",
            })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })


})