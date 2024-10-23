// Import the framework and instantiate it
import Fastify from "fastify";
import { getVariable } from "./routes/route";
const fastify = Fastify({
  //   logger: true,
});

// Declare a route
fastify.post("/", getVariable);

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
