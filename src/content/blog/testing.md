## How to be sane when developing complex application | Testing with Jest

### Oct 13 2025

I was doing development on my project and after some time i did some code refactoring and it was simple so i pushed the code to production. The things about pushing code and not testing them is when you make such changes and push it you think you have done is right but some things break and are easy to notice manually.


So i started adding test to my project to make sure the changes doesnt break any functionality which was working fine but my peanut brain missed.


Its a NodeJS backend so i used supertest and jest to write test cases. Its too easy or may be i am not doing through testing but its really simple to write tests in jest.

supppose we have a function which simply adds two number.


```ts
function sum(a, b) { return a + b;} 
module.exports = sum;
```
we test it by importing the function and then

```ts
const sum = require('./sum'); test('adds 1 + 2 to equal 3', () => { 
  expect(sum(1, 2)).toBe(3); 
});
```

This is how we do testing mostly. But lets see real world example. Suppose you made some changes to the login endpoint on the nodeJS backend application but how to you make sure your its working correctly. we write test case for it.

```ts
import request from 'supertest';
import server from '../index.js';
import mongoose from 'mongoose';

// connect to the database here mongoDB
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});



// Describes the test group which are running. 
describe('User Routes', () => {

    // single test which creates a new user.
    it('should register a new user', async () => {
        const res = await request(server)
            .post('/user/create')
            .send({
                username: 'TestUser',
                email: 'test@example.com',
                password: 'password123'
            });
        // checks weather request is successfull
        expect(res.statusCode).toBe(200);
        console.log(res.body)
    });

});

// DONT DELETE YOUR MAIN
//....
//....
//....
// deleted the data base after all the tests [TEST DB] 
afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});
```