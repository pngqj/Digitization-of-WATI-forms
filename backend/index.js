const app = require('./app');
const { port_no } = require("./constants");

// Start the server
const port = process.env.PORT || port_no;
app.listen(port);
console.log(`Server listening at ${port}`);

// refactored code for easier test and feature scale
