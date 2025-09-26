const http = require("http");
const app = require("./app");
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server is running on port 3003");
});

module.exports = server;
