export default () => ({
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRED_TIME: process.env.JWT_EXPIRED_TIME,
});
