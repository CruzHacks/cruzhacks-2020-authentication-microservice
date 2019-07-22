"use strict";

const createAzureFunctionHandler = require("azure-function-express")
  .createHandler;
const app = require("express")();
const jwt = require("express-jwt");
// const jwtAuthz = require("express-jwt-authz"); // we'll be using this for authorization between API's
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
require("dotenv").config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

// using default react port
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

app.get("/api/:authenticate/:private", checkJwt, (req, res) => {
  res.json({
    message:
      "Hello from a private endpoint! If you see this you're authenticated..."
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

module.exports = createAzureFunctionHandler(app);
