// import { NextFunction, Request, Response } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { User } from '../modules/User/user.model';

// type TUserRole = 'admin' | 'user';

// const auth = (...requiredRoles: TUserRole[]) => {
//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ): Promise<void> => {
//     try {
//       const token = req.headers.authorization;

//       // check if the token is missing
//       if (!token) {
//         res.status(401).json({ message: 'Token is missing' });
//       }

//       // check if the token is valid
//       let decoded: JwtPayload;

//       try {
//         decoded = jwt.verify(
//           token as string,
//           config.jwt_access_secreat as string,
//         ) as JwtPayload;
//       } catch (err) {
//         res.status(401).json({ error: err, message: 'Token is invalid' });
//       }
//       const { email, role } = decoded;

//       const user = await User.findOne({ email });

//       //check if the user exsist
//       if (!user) {
//         res.status(401).json({ message: 'User not found' });
//       }

//       //check if the user is blocked
//       if (user.isBlocked) {
//         return res.status(401).json({ message: 'User is blocked' });
//       }

//       //check if the user has the required role
//       if (requiredRoles && !requiredRoles.includes(role)) {
//         return res.status(403).json({ message: 'Forbidden' });
//       }

//       //attach the user to the request object
//       req.user = user;
//       next();
//     } catch (err) {
//       res.status(500).json({ message: err });
//     }
//   };
// };

// export default auth;

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';

type TUserRole = 'admin' | 'user';

const auth = (...requiredRoles: TUserRole[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.headers.authorization;

      // Check if the token is missing
      if (!token) {
        res.status(401).json({ message: 'Token is missing' });
        return;
      }

      // Verify the token
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          token,
          config.jwt_access_secreat as string,
        ) as JwtPayload;
      } catch (err) {
        res
          .status(401)
          .json({ message: 'Token is invalid', error: err });
        return;
      }

      const { email, role } = decoded;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Check if the user is blocked
      if (user.isBlocked) {
        res.status(403).json({ message: 'User is blocked' });
        return;
      }

      // Check if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        res.status(403).json({ message: 'Forbidden: insufficient role' });
        return;
      }

      // Attach the user to the request object
      // (req as any).user = user;
      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal server error', error: err });
    }
  };
};

export default auth;
