// STARTER CODE - This file has intentional issues for candidates to fix
import Fastify from 'fastify';
import mercurius from 'mercurius';
import cors from '@fastify/cors';


const fastify = Fastify({ logger: true });

import db from './shared/_db.js';
import schema from './shared/schema.js';




// Resolvers - all logic crammed here (anti-pattern)
const resolvers = {
  Query: {
    products: () => {
      return db.products; 
    },
    cart: () => {
      return db.cart;
    },
    product(_, { id }) {
      return db.products.find(p => p.id === id);
    },
  },
  Product: {
    cartIncluded: (product) => {
      return db.cart.filter(item => item.productId === product.id);
    }
  },
  Mutation: {
    // BUG: No stock validation! Candidates should fix this
    addToCart: (_, { productId, quantity }) => {
      const existing = db.cart.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        db.cart.push({ productId, quantity });
      }
      // BUG: Not updating product stock
      return db.cart;
    },
    // BUG: Doesn't restore stock when removing
    removeFromCart: (_, { productId }) => {
      db.cart = db.cart.filter(item => item.productId !== productId);
      return db.cart;
    },
  },
};

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
