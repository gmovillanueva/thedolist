import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '@config/swagger.config';

/*import path from 'path';*/

/*const swaggerPath = path.join(process.cwd(), '/docs/');*/

const docRouter = express.Router();

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/docs/*.ts'],
});

docRouter.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

/*docRouter.get(
  '/',
  )
);*/

export default docRouter;
