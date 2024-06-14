import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import orderRoute from '@/routes/order';
import productRoute from './routes/product';

import { errorHandler } from '@/error-handler';

const app = fastify().withTypeProvider(); // LOG servidor { logger: true }

app.register(fastifyCors, {
  origin: '*',
});

app.register(orderRoute, { prefix: 'orders' });
app.register(productRoute, { prefix: 'products' });

app.setErrorHandler(errorHandler);

const PORT = Number(process.env.PORT) || 3333; // port

app
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`HTTP server running PORT :${PORT}!`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
