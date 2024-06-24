require('../models')
const request = require("supertest")
const app = require('../app')

let movieId 
const BASE_URL = '/api/v1/movies'

const movie = {
   name: 'Son como niños',
   image: 'lorem.png',
   synopsis: 'lorem',
   releaseYear: '1998-07-08'
}

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === movie.name", async ()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(movie)

  movieId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)

})

test("GET -> 'BASE_URL', should return status code 200, and res.body[0].name === movie.name", async ()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(movie.name)
    expect(res.body).toHaveLength(1)
})

test("Get -> 'BASE_URL/:id', should return status code 200, return res.body.name === movie.name ", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${movieId}`)
  
      console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  })

  test("PUT 'URL_BASE/:id' should return status code 200, and res.body.name === nameUpdate.name", async () => {

    const nameUpdate = {
        name: 'Son como niños',
        image: 'lorem.png',
        synopsis: 'lorem',
        releaseYear: '1998-07-08'
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${movieId}`)
      .send(nameUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(nameUpdate.name)
  })

  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${movieId}`)
  
    expect(res.status).toBe(204)
  })