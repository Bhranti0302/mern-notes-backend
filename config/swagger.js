const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Required OpenAPI version
    info: {
      title: "MERN Notes App API",
      version: "1.0.0",
      description: "API documentation for the Notes App backend",
    },
    servers: [
      {
        url: "https://mern-notes-backend-nxy7.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
