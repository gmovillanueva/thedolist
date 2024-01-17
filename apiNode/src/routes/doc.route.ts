import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '@config/swagger.config';

const docRouter = express.Router();

const swaggerSpecs = swaggerJSDoc({
  swaggerConfig,
  apis: ['src/docs/*.yml'],
});

docRouter.use('/', swaggerUi.serve);
docRouter.get(
  '/',
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
  })
);

export default docRouter;
