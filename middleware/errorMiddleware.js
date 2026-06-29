// Not Found
const notFound = (req, res, next) => {
  res.status(404);
  throw new Error(`Not Found - ${req.originalUrl}`);
};

// Error Handler
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message,
  });
};


module.exports = {
  notFound,
  errorHandler,
};
