export default () => ({
    MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI || "mongodb://localhost/area",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
});