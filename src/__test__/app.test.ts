import supertest from 'supertest'
const app= require('../app')

let token: string

beforeAll(() => {
 //connection to the test db
})

describe("Auth", () => {
 const data = {
   firstname: 'Sam',
   lastname: 'Aju',
   email: 'samson12578j@gmail.com',
   password: '123456',
 }
 test("signup", async () => {
  const response = await supertest(app).post("/users/signup").send(data);
  expect(response.status).toBe(500);
  expect(response.body.message).toBe("duplicate key value violates unique constraint \"users_email_key\"");
  expect(response.body.userDetails.email).toBe(data.email);
 });
//  test("login", async () => {
//   const response = await supertest(app)
//    .post("/login")
//    .send({ email: data.email, password: data.password });
//   token = response.body.user.token
//   expect(response.status).toBe(201);
//   expect(response.body.message).toBe("login successful");
//  });
});
//let res:string;


