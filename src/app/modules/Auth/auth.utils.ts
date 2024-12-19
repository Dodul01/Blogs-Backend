import Jwt from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { email: string; role: string },
  secreat: string,
  expiresIn: string,
) => {
  return Jwt.sign(JwtPayload, secreat, { expiresIn });
};
