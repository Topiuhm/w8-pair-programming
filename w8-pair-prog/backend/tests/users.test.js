const mongoose = require("mongoose");
const supertest = require("supertest")
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");

const signupUrl = "/api/users/signup"
const loginUrl = "/api/users/login"

/*{
  "name": "Spongebob",
  "email": "spongebob@gmail.com",
  "password": "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
  "phoneNumber": "12556215",
  "profilePicture": "lmao",
  "gender": "Male",
  "dateOfBirth": "12-3-2006",
  "role": "admin",
  "address": {
    "street": "Bikini Bottom Street",
    "city": "Bikini Bottom",
    "state": "Sea",
    "zipCode": "251512"
  }
}*/

beforeEach(async () => {
    await User.deleteMany({});
});

describe("POST /api/users/signup", () => {
    describe("valid payload", () => {
        it("should return json format and http 201", async () => {
            const newUser = {
                name: "Spongebob",
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }
            await api
                .post(signupUrl)
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/);
        });

        it("should save the new user to db", async () => {
            const usersOld = await User.find({})
            const newUser = {
                name: "Spongebob",
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }

            await api
                .post(signupUrl)
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /applicaton\/json/);

            const usersNew = await User.find({})
            expect(usersNew.length).toEqual(usersOld.length + 1)
        });

        it("should return email and token", async () => {
            const newUser = {
                name: "Spongebob",
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }

            const response = await api
                .post(signupUrl)
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toHaveProperty("email")
            expect(response.body).toHaveProperty("token")
        });

        it("should return http 400 for duplicate email", async () => {
            const newUser = {
                name: "Spongebob",
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }
            const duplicateUser = {
                name: "Spongebob2",
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }
            await api
                .post(signupUrl)
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            await api
                .post(signupUrl)
                .send(duplicateUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        });
    });

    describe("invalid payload", () => {
        it("should return json format and http 400", async () => {
            const invalidUser = {
                name: "Spongebob",
                email: "spongebob@gmail.com",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }

            await api
                .post(signupUrl)
                .send(invalidUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        });

        it("should not save the invalud user to db", async () => {
            const usersOld = await User.find({})
            const invalidUser = {
                name: "Spongebob",
                email: "spongebob@gmail.com",
                phoneNumber: "12556215",
                profilePicture: "lmao",
                gender: "Male",
                dateOfBirth: "12-3-2006",
                role: "admin",
                address: {
                    street: "Bikini Bottom Street",
                    city: "Bikini Bottom",
                    state: "Sea",
                    zipCode: "251512"
                }
            }
            await api
                .post(signupUrl)
                .send(invalidUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);

            const usersNew = await User.find({})
            expect(usersNew.length).toEqual(usersOld.length)
        });
    });
});

describe("POST /api/users/login", () => {

    beforeEach(async () => {
        await api.post("/api/users/signup").send({
            name: "Spongebob",
            email: "spongebob@gmail.com",
            password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO",
            phoneNumber: "12556215",
            profilePicture: "lmao",
            gender: "Male",
            dateOfBirth: "12-3-2006",
            role: "admin",
            address: {
                street: "Bikini Bottom Street",
                city: "Bikini Bottom",
                state: "Sea",
                zipCode: "251512"
            }
        });
    });

    describe("valid payload", () => {
        it("should return json format and http 200", async () => {
            const userLogin = {
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO"
            }
            await api
                .post(loginUrl)
                .send(userLogin)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });
        it("should return email and token", async () => {
            const userLogin = {
                email: "spongebob@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO"
            }
            const response = await api
                .post(loginUrl)
                .send(userLogin)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toHaveProperty("email")
            expect(response.body).toHaveProperty("token")
        });
    });

    describe("invalid payload", () => {
        it("should return json format and http 500 with incorrect password", async () => {
            const invalidUser = {
                email: "spongebob@gmail.com",
                password: "wrongpwd"
            }
            await api
                .post(signupUrl)
                .send(invalidUser)
                .expect(500)
        });

        it("should return json format and http 500 with incorrect email", async () => {
            const invalidUser = {
                email: "wrong@gmail.com",
                password: "$2b$10$/kv.ZdBqyZf7ojfQgymUy.h4DO9MCc5jjZ9BmuYzsUZn/2nkIJXiO"
            }
            await api
                .post(signupUrl)
                .send(invalidUser)
                .expect(500)
        });
    });
});

afterAll(async () => {
    await mongoose.connection.close();
})