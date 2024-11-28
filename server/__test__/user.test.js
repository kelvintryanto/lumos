const request = require("supertest");

const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");

beforeAll(async () => {
  // ambil data users
  const users = require("../data/users.json");

  users.forEach((el) => {
    delete el.id;
    el.password = hash(el.password);
    el.createdAt = el.updatedAt = new Date();
  });
  // karena menggunakan queryInterface
  await sequelize.queryInterface.bulkInsert("Users", users, {});
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("Login User", () => {
  describe("Success Login User", () => {
    test("1.a.Should be success to login and send access_token", async () => {
      const response = await request(app).post("/login").send({
        email: "adinugroho@example.com",
        password: "12345",
      });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failed Login User", () => {
    test("1.b.When email not given/input", async () => {
      const response = await request(app).post("/login").send({
        email: "",
        password: "12345",
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Please input email or password");
    });

    test("1.c.Password not given/input", async () => {
      const response = await request(app).post("/login").send({
        email: "adinugroho@example.com",
        password: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Please input email or password");
    });

    test("1.d.Email given invalid/not registered", async () => {
      const response = await request(app).post("/login").send({
        email: "random@gmail.com",
        password: "12345",
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email or password");
    });

    test("1.e.Password given wrong/not match", async () => {
      const response = await request(app).post("/login").send({
        email: "kelvin.tryanto@gmail.com",
        password: "54321",
      });

      console.log(response.body);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email or password");
    });
  });
});

describe("Register User", () => {
  describe("Success Register User", () => {
    test("1.a.Should be success to register", async () => {
      const response = await request(app).post("/register").send({
        username: null,
        email: "user@mail.com",
        password: "12345",
      });

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("Failed Register User", () => {
    test("1.b.When email not given/input", async () => {
      const response = await request(app).post("/register").send({
        email: "",
        password: "12345",
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Email required");
    });

    test("1.c.Password not given/input", async () => {
      const response = await request(app).post("/register").send({
        email: "user@mail.com",
        password: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Password required");
    });

    test("1.d.Email given registered", async () => {
      const response = await request(app).post("/register").send({
        email: "user@mail.com",
        password: "12345",
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email or password");
    });
  });
});
