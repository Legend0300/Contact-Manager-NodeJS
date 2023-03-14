const errorHandler =  function (err, req, res, next) {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.json({ title: "Not Found" ,  message: err.message, statusCode: statusCode , stackTrace: err.stack})
    res.json({ title: "Validation Failed" ,  message: err.message, statusCode: statusCode , stackTrace: err.stack})
  }
  
  module.exports = errorHandler;