const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const Property = require("../models/propertyModel");
const User = require("../models/userModel");

const propertySeed = [
    {
        title: 'Patricks spacious rock',
        type: 'House',
        description: 'its a (spacious) rock',
        price: 70,
        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
        squareFeet: 20,
        yearBuilt: 1994,
        bedrooms: 1
    },
    {
        title: 'Spongebobs pineapple',
        type: 'House',
        description: 'A mighty pineapple',
        price: 400,
        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
        squareFeet: 40,
        yearBuilt: 1996,
        bedrooms: 2
    },
    {
        title: 'Squidwards moai house',
        type: 'House',
        description: 'A handsome fella lives there',
        price: 70,
        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
        squareFeet: 35,
        yearBuilt: 1992,
        bedrooms: 1
    }
]

const propertiesInDb = async () => {
    const all = await Property.find({});
    return all.map((a) => a.toJSON());
}

let token;
beforeAll(async () => {
    await User.deleteMany({})
    const newUser = {
        name: "Larry",
        email: "larry@evil.com",
        password: "$2b$10$8JgHaAfPEmMUHfwL8vyXhugWnqdJIfZ0oAztPSzzL9zee2m20hR1C",
        phoneNumber: "0123456789",
        profilePicture: "Maimasmdasdnsdj",
        gender: "Male",
        dateOfBirth: "1265-01-01",
        role: "admin",
        address: {
            street: "Homestreet",
            city: "Evil kingdom",
            state: "Evil world",
            zipCode: "616"
        }
    }

    const response = await api
        .post("/api/users/signup")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    token = response.body.token
});


describe("Property routes", () => {
    beforeEach(async () => {
        await Property.deleteMany({});
        await Promise.all(
            propertySeed.map((property) =>
                api
                    .post("/api/properties/")
                    .set("Authorization", "Bearer " + token)
                    .send(property)
            )
        );
    });
    describe("No Auth", () => {
        describe("GET /api/properties", () => {
            it("should return json format and http 200", async () => {
                const res = await api
                    .get("/api/properties")
                    .expect(200)
                    .expect("Content-Type", /application\/json/);
                expect(res.body).toHaveLength(propertySeed.length);
            });

            it("should return all properties set in propertyseed", async () => {
                const response = await api
                    .get("/api/properties")
                    .expect(200)
                    .expect("Content-Type", /application\/json/);

                expect(response.body).toHaveLength(propertySeed.length)
            });
        });

        describe("GET /api/properties/:propertyId", () => {
            it("should return json format and http 200", async () => {
                const properties = await propertiesInDb()

                await api
                    .get("/api/properties/" + properties[0]._id)
                    .expect(200)
                    .expect("Content-Type", /application\/json/);
            });

            it("should return property set in propertyseed", async () => {
                const properties = await propertiesInDb()

                const response = await api
                    .get("/api/properties/" + properties[0]._id)
                    .expect(200)
                    .expect("Content-Type", /application\/json/);

                expect(response.body.title).toBe(propertySeed[0].title)
            });

            it("should return 404 for invalid id", async () => {
                await api
                    .get("/api/properties/" + "1234")
                    .expect(404)
                    .expect("Content-Type", /application\/json/);
            });
        });
    })

    describe("Authentication required", () => {
        describe("POST /api/properties", () => {
            describe("valid payload", () => {
                it("should return json format and http 201", async () => {
                    const newProperty = {
                        title: 'Sandys bubble',
                        type: 'House',
                        description: 'its a (spacious) bubble',
                        price: 90,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 20,
                        yearBuilt: 1994,
                        bedrooms: 1
                    }

                    await api
                        .post("/api/properties")
                        .send(newProperty)
                        .set("Authorization", "Bearer " + token)
                        .expect(201)
                        .expect("Content-Type", /application\/json/);
                });

                it("should save the new property to db", async () => {
                    const oldProperty = await propertiesInDb()
                    const newProperty = {
                        title: 'Sandys bubble x2',
                        type: 'House',
                        description: 'its a (more spacious) bubble',
                        price: 90,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 60,
                        yearBuilt: 1994,
                        bedrooms: 1
                    }

                    await api
                        .post("/api/properties")
                        .send(newProperty)
                        .set("Authorization", "Bearer " + token)
                        .expect(201)
                        .expect("Content-Type", /application\/json/);

                    const newStuff = await propertiesInDb()
                    expect(newStuff).toHaveLength(oldProperty.length + 1)
                });
            });

            describe("invalid payload", () => {
                it("should return http 400 (bad request) with missing parameters", async () => {
                    const newProperty = {
                        title: '(not) Sandys bubble x2',
                        type: 'House',
                        description: 'its a (more spacious) bubble',
                        price: 90,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 60,
                        yearBuilt: 1994
                    }

                    await api
                        .post("/api/properties")
                        .send(newProperty)
                        .set("Authorization", "Bearer " + token)
                        .expect(400)
                        .expect("Content-Type", /application\/json/);
                });

                it("should return http 401 without token", async () => {
                    const newProperty = {
                        title: '(not) Sandys bubble x2',
                        type: 'House',
                        description: 'its a (more spacious) bubble',
                        price: 90,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 60,
                        yearBuilt: 1994,
                        bedrooms: 1
                    }
                    await api
                        .post("/api/properties")
                        .send(newProperty)
                        .expect(401)
                        .expect("Content-Type", /application\/json/);

                })
            });
        });

        describe("PUT /api/properties/:propertyId", () => {
            describe("valid payload", () => {
                it("should return json format and http 201", async () => {
                    const properties = await propertiesInDb()
                    const updateProperties = {
                        title: 'Patricks spacious rock',
                        type: 'House',
                        description: 'its a (spacious) rock',
                        price: 60,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 20,
                        yearBuilt: 1994,
                        bedrooms: 1
                    }

                    await api
                        .put("/api/properties/" + properties[0]._id)
                        .send(updateProperties)
                        .set("Authorization", "Bearer " + token)
                        .expect(200)
                        .expect("Content-Type", /application\/json/);
                });

                it("should update the properties in db", async () => {
                    const properties = await propertiesInDb()
                    const updatedProperties = {
                        title: 'Patricks spacious rock',
                        type: 'House',
                        description: 'its a (very) spacious rock',
                        price: 60,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 20,
                        yearBuilt: 1994,
                        bedrooms: 1
                    }

                    await api
                        .put("/api/properties/" + properties[0]._id)
                        .send(updatedProperties)
                        .set("Authorization", "Bearer " + token)
                        .expect(200)
                        .expect("Content-Type", /application\/json/);

                    const propertiesNew = await propertiesInDb()
                    expect(propertiesNew[0].description).not.toBe(properties[0].description)
                });
                it("should return 401 without token", async () => {
                    const properties = await propertiesInDb()
                    const updatedProperties = {
                        title: 'Patricks spacious rock',
                        type: 'House',
                        description: 'its a (very) spacious rock',
                        price: 60,
                        location: { address: 'Bikini bottom', city: 'Sea', state: 'Sea' },
                        squareFeet: 20,
                        yearBuilt: 1994,
                        bedrooms: 1
                    }

                    await api
                        .put("/api/properties/" + properties[0]._id)
                        .send(updatedProperties)
                        .expect(401)
                });
            });
        });

        describe("DELETE /api/properties/:propertyId", () => {
            describe("valid payload", () => {
                it("should return json format and http 204", async () => {
                    const properties = await propertiesInDb()
                    await api
                        .delete("/api/properties/" + properties[0]._id)
                        .set("Authorization", "Bearer " + token)
                        .expect(204)
                });

                it("should delete the vehicleRental from db", async () => {
                    const oldProperties = await propertiesInDb()

                    await api
                        .delete("/api/properties/" + oldProperties[0]._id)
                        .set("Authorization", "Bearer " + token)
                        .expect(204)

                    const propertiesNew = await propertiesInDb()
                    expect(propertiesNew).toHaveLength(oldProperties.length - 1)
                });
            });

            it("should return http 404 with invalid id", async () => {

                await api
                    .delete("/api/properties/" + "1234")
                    .set("Authorization", "Bearer " + token)
                    .expect(404)
                    .expect("Content-Type", /application\/json/);
            });
            it("should return http 401 without token", async () => {
                const properties = await propertiesInDb()
                await api
                    .delete("/api/properties/" + properties[0]._id)
                    .expect(401)
            });
        });
    })

})

afterAll(async () => {
    await mongoose.connection.close();
});