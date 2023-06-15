import supertest from "supertest"
import { web } from "../src/app/web"
import { primaclient } from "../src/app/database"
import { logger } from "../src/app/logging"

describe('POST /api/users', function () {

    afterEach(async () => {
        await primaclient.user.deleteMany({
            where: {
                username: "Fuma"
            }
        })
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "Fuma",
                password: "Wazxse34",
                name: "Fuma zako"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Fuma")
        expect(result.body.data.name).toBe("Fuma zako")
        expect(result.body.data.password).toBeUndefined()
    })


    it('should reject if request invalid', async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: "Fuma zako"
            })
        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post("/api/users")
            .send({
                username: "Fuma",
                password: "Wazxse34",
                name: "Fuma zako"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Fuma")
        expect(result.body.data.name).toBe("Fuma zako")
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
            .post("/api/users")
            .send({
                username: "Fuma",
                password: "Wazxse34",
                name: "Fuma zako"
            })
        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})