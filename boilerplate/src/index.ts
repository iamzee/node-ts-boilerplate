import http from "node:http";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // TODO: respond with "ok"
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { server };
