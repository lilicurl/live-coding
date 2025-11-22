import Fastify from 'fastify';
import mercurius from 'mercurius';
import cors from '@fastify/cors';
import { schema } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });
await fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

fastify.listen({ port: 4000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('Server running at http://localhost:4000/graphiql');
});
