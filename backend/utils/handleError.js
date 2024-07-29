const handleError = (err, res) => {
    res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
  };
  
  module.exports = handleError;
  