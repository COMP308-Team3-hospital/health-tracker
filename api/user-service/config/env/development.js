// Development configuration options
// To sign the session identifier, use a secret string
const config = {
  authDb: "mongodb://127.0.0.1:27017/auth-db",
  //vitalSignDb: "mongodb://127.0.0.1:27017/lab3-vital-sign-db",
  sessionSecret: "developmentSessionSecret",
  secretKey: "developmentSecretKey",
};

export default config;
