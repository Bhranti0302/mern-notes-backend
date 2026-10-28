require("dotenv").config({ quiet: true });

if (!process.env.TEST_MONGO_URI) {
  throw new Error("TEST_MONGO_URI is missing from .env");
}

if (!process.env.TEST_MONGO_URI.includes("mern_notes_test")) {
  throw new Error("Tests must use the mern_notes_test database");
}
