'use strict'

const autocannon = require('autocannon')

const PORT = 3000
const url = 'http://localhost:' + PORT
// const instance = autocannon({
//   url: 'http://localhost:3000/user',
//   method: 'POST',

//   connections: 6,
//   duration: 10,
// }, console.log)


const instance = autocannon({
      url: url,
      connections: 50,
      duration: 10,
      headers: {
        // by default we add an auth token to all requests
        auth: 'A Pregenerated auth token'
      },
      requests: [
        {
          method: 'GET', // this should be a post for logging in
          path: '/user',
          //body: 'valid login details',
          // overwrite our default headers,
          // so we don't add an auth token
          // for this request
          //headers: {}
        },
        // {
        //   path: '/mySecretDetails'
        //   // this will automatically add the pregenerated auth token
        // },
        {
          method: 'POST', // this should be a put for modifying secret details
          path: '/auth/register',
          headers: { // let submit some json?
            'Content-type': 'application/json; charset=utf-8'
          },
          // we need to stringify the json first
          body: JSON.stringify({
            firstName: "Kushal",
            lastName : "Shit",
            email: "kushal@gmail.com",
            userName: "kushal",
            password: "hello@123",
            role: "ADMIN"
          }),
        //   setupRequest: reqData => {
        //     reqData.method = 'PUT' // we are overriding the method 'GET' to 'PUT' here
        //     return reqData
        //   }
        }
      ]
    }, finishedBench)

function finishedBench (err, res) {
    console.log('finished bench', err, res)
}
  
// just render results
autocannon.track(instance, {renderProgressBar: true})

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
    instance.stop()
})