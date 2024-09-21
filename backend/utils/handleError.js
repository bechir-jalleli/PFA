module.exports = (err, res) => {
  if (res && typeof res.status === 'function') {
      res.status(err.status || 500).json({
          success: false,
          message: err.message || 'Internal Server Error',
      });
  } else {
      console.error('Error: res object is invalid or undefined');
  }
};
