import { FastifyInstance } from 'fastify';

import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Error during validation',
      errors: error.flatten().fieldErrors,
    });
  }

  // console.error(error);
  console.error('Error executing query:', error);

  return reply.status(500).send({ message: 'An error occurred while executing the query.' });
};
