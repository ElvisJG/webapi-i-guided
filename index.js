const express = require('express');

const server = express();

// Should be the last step
server.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
