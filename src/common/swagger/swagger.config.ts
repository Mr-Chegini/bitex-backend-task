import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Bitex API',
  description: 'bitex api',
  version: process.env.APP_VERSION,
  tags: ['bitex'],
};
