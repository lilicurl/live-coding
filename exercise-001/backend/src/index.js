// STARTER CODE - This file has intentional issues for candidates to fix
import Fastify from 'fastify';
import mercurius from 'mercurius';
import cors from '@fastify/cors';

const fs = require('fs');
const path = require('path');

const fastify = Fastify({ logger: true });

// In-memory data store - everything in one place (not ideal)
let products = path.join(__dirname, 'shared/products.json');


let cart = [];



// Resolvers - all logic crammed here (anti-pattern)
const resolvers = {
  Query: {
    products: () => {
      // TODO: This works but could be better organized
      return products;
    },
    cart: () => {
      return cart;
    },
  },
  Mutation: {
    // BUG: No stock validation! Candidates should fix this
    addToCart: (_, { productId, quantity }) => {
      const existing = cart.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
      // BUG: Not updating product stock
      return cart;
    },
    // BUG: Doesn't restore stock when removing
    removeFromCart: (_, { productId }) => {
      cart = cart.filter(item => item.productId !== productId);
      return cart;
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
