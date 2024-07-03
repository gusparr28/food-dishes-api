import app from "./app";

const server = Bun.serve({
	hostname: "0.0.0.0",
	port: process.env.PORT || 3000,
	fetch: app.fetch,
});

console.log("server running on port:", server.port);
