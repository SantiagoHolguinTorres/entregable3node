const request = require("supertest")
const app = require('../app')

let directorId 
const BASE_URL = '/api/v1/directors'

const director = {
    firstName: 'John',
    lastName: 'Smith',
    nationality: 'Estadounidense',
    image: 'lorem.png',
    birthday: '1998-07-07'

}

test("POST -> 'BASE_URL', should return status code 201, and res.body.firstName === director.firstName", async ()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(director)

  directorId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)

})

test("GET -> 'BASE_URL', should return status code 200, and res.body[0].firstName === director.firstName", async ()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(director.firstName)
    expect(res.body).toHaveLength(1)
})

test("Get -> 'BASE_URL/:id', should return status code 200, return res.body.firstName === genre.firstName ", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${directorId}`)
  
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  })

  test("PUT 'URL_BASE/:id' should return status code 200, and res.body.firstName === nameUpdate.firstName", async () => {

    const nameUpdate = {
        firstName: 'John',
        lastName: 'Smith',
        nationality: 'Estadounidense',
        image: 'lorem.png',
        birthday: '1998-07-07'
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${directorId}`)
      .send(nameUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(nameUpdate.firstName)
  })

  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${directorId}`)
  
    expect(res.status).toBe(204)
  })