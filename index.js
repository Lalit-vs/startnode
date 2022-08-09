const http = require("http");
const https = require("https");
const app = require("./app");
var fs = require('fs');
//For http only
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
server.listen(port, () => {
console.log(`Server running on port ${port}`);
});