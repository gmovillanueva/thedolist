import App from '@/app';

const app = new App();
const expressServer = app.express;

app.connectPrisma().catch((err) => {
  throw err;
});

export default expressServer;
