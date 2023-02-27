import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.TOKEN_EXPIRE_TIME,
};
