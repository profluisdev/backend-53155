export const errorHandle = (err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};
