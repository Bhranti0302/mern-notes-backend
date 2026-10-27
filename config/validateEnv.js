const validateEnv = () => {
  const requiredVariables = ["MONGO_URI", "JWT_SECRET"];

  const missingVariables = requiredVariables.filter((key) => !process.env[key]);

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(",")}`,
    );
  }
};

module.exports = validateEnv;
