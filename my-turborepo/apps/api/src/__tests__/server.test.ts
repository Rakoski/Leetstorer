import supertest from "supertest";
import { createServer } from "../server";

const Problem = require('./models/problem');
const User = require('./models/user');

describe("GraphQL Endpoints", () => {
    let token;

    beforeAll(async () => {
        // Perform login mutation to obtain token
        const loginResponse = await supertest(createServer())
            .post("/graphql")
            .send({
                query: `
                    mutation {
                        login(email: "virgilvdikje@gmail.com", password: "123456") {
                            token
                        }
                    }
                `,
            })
            .expect(200);

        token = loginResponse.body.data.login.token;
    });

    it("should create a user", async () => {
        const response = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
          mutation {
            createUser(userInput: { email: "test@example.com", password: "password123" }) {
              _id
              email
            }
          }
        `,
            })
            .expect(200);

        const createdUser = await User.findOne({ email: "test@example.com" });

        expect(response.body.data.createUser).toEqual({
            _id: createdUser._id.toString(),
            email: createdUser.email,
        });
    });

    it("should query users", async () => {
        const response = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
          {
            users {
              _id
              email
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.users).toBeDefined();
    });

    it("should create a problem", async () => {
        const response = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
          mutation {
            createProblem(problemInput: {
              title: "Test Problem",
              description: "Test Description",
              level: "Easy",
              frequency: 1.5,
              link: "http://example.com",
              data_structure: "Array",
              date: "2024-01-18"
            }) {
              _id
              title
              level
            }
          }
        `,
            })
            .expect(200);

        const createdProblem = await Problem.findOne({ title: "Test Problem" });

        expect(response.body.data.createProblem).toEqual({
            _id: createdProblem._id.toString(),
            title: createdProblem.title,
            level: createdProblem.level,
        });
    });

    it("should query problems", async () => {
        const response = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
          {
            problems {
              _id
              title
              level
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.problems).toBeDefined();
    });
    
        it("should associate a user with a problem", async () => {
        const createUserResponse = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                  mutation {
                    createUser(userInput: { email: "associate@example.com", password: "password123" }) {
                      _id
                      email
                    }
                  }
                `,
            })
            .expect(200);

        const userId = createUserResponse.body.data.createUser._id;

        const createProblemResponse = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                  mutation {
                    createProblem(problemInput: {
                      title: "Associate Test Problem",
                      description: "Test Description",
                      level: "Easy",
                      frequency: 1.5,
                      link: "http://example.com",
                      data_structure: "Array",
                      date: "2024-01-18",
                      userId: "${userId}"
                    }) {
                      _id
                      title
                      level
                    }
                  }
                `,
            })
            .expect(200);

        const problemId = createProblemResponse.body.data.createProblem._id;

        const associateResponse = await supertest(createServer())
            .post("/graphql")
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                  mutation {
                    associateUserWithProblem(userId: "${userId}", problemId: "${problemId}") {
                      _id
                      title
                      level
                      creator {
                        _id
                        email
                      }
                    }
                  }
                `,
            })
            .expect(200);

        expect(associateResponse.body.data.associateUserWithProblem).toEqual({
            _id: problemId,
            title: "Associate Test Problem",
            level: "Easy",
            creator: {
                _id: userId,
                email: "associate@example.com",
            },
        });
    });
});
