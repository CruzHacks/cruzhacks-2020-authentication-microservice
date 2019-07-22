# cruzhacks-2020-authentication-microservice

- work in progress
  - this is a boilerplate for handling routes that will require authentication for the cruzhacks website
- this backend service's purpose will be to validate tokens sent from the client
  - further down the line it will also be used for authentication between APIs if needed

I'm using express for azure functions since express is required to use auth0's node-js wrapper for creating a back-end authentication service

Run this alongside https://github.com/CruzHacks/cruzhacks-2020-test-client to see how they work together. Try logging in with the test user and navigate to the profile and private tabs.

The following link might help clarify what this service should accomplish, and it's where I got started with this iteration of the authentication service.

https://auth0.com/docs/quickstart/backend/nodejs
