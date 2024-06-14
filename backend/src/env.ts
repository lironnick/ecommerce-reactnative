import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
