export default () => ({
  MONGODB_CONNECTION_URI:
    process.env.MONGODB_CONNECTION_URI || 'mongodb://mongo-area/area',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  OPENAI_KEY: process.env.OPENAI_KEY || 'secret',
  WEBHOOKURL: process.env.WEBHOOK_URL,
});
