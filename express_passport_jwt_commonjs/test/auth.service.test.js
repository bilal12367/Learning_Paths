const sinon = require('sinon')
const UserModel = require('../schemas/User')
const AuthService = require("../service/AuthService")
const PasswordMismatch = require('../errors/PasswordMismatch')

const logger = require('../logger/logger')
const { mockUser, mockToken } = require('./mockData')
const UserAlreadyExists = require('../errors/UserAlreadyExists')
const UserNotExists = require('../errors/UserNotExists')


describe("Auth Service", () => {
    var createUserStub, existsUserStub, findUserStub, comparePswdStub;
    beforeEach(() => {
        createUserStub = sinon.stub(UserModel, "create");
        existsUserStub = sinon.stub(UserModel, "exists");
        findUserStub = sinon.stub(UserModel, "findOne");
        comparePswdStub = sinon.stub(new UserModel(), "comparePassword");
    })

    afterEach(() => {
        createUserStub.restore()
        existsUserStub.restore()
        findUserStub.restore()
        comparePswdStub.restore()
    })


    test("Should register a user", async () => {

        mockUser.createJwt = sinon.stub().returns(mockToken)

        createUserStub.callsFake(() => Promise.resolve(mockUser))
        existsUserStub.callsFake(() => Promise.resolve(false))
        const result = await AuthService.registerService("user1", "lastname", "user1@gmail.com", "Test!321")

        expect(mockToken).toBe(result.token)
    })
    test("Should login a user", async () => {
        let inputData = {
            email: "user1@gmail.com",
            password: "Test!321"
        }
        mockUser.createJwt = sinon.stub().returns(mockToken)
        mockUser.comparePassword = comparePswdStub.callsFake(()=> true)
        existsUserStub.callsFake(() => Promise.resolve(true))
        findUserStub.callsFake(() => Promise.resolve(mockUser))

        const result = await AuthService.loginService(inputData.email, inputData.password)

        expect(mockToken).toBe(result.token)
    })
    test("Should Throw UserAlreadyExists Error", async () => {
        existsUserStub.callsFake(() => Promise.resolve(true))
        expect(AuthService.registerService("test", "test", "test1@gmail.com", "Test!321")).rejects.toThrow(UserAlreadyExists)
    })

    test("Should Throw UserNotFound Error", async () => {
        existsUserStub.callsFake(() => Promise.resolve(false))
        expect(AuthService.loginService("test@gmail.com", "Test!321")).rejects.toThrow(UserNotExists)
    })

    test("Should throw password mismatch Error", async () => {
        existsUserStub.callsFake(() => Promise.resolve(true))
        mockUser.comparePassword = comparePswdStub.callsFake(() => false)
        findUserStub.callsFake(()=>Promise.resolve(mockUser))
        expect(AuthService.loginService("test","test")).rejects.toThrow(PasswordMismatch)
    })

})