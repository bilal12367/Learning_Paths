
import { UserModel } from '../schema/User.js'


jest.mock("../schema/User.js", () => {
    create: jest.fn()
})

describe('Register Service', () => {

    it("Should register a user", async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        };

       // Import after mocking

        create.mockResolvedValue(userData);

        await registerService(userData);

        expect(create).toHaveBeenCalledWith(userData);
    })
})