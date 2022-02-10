import User from '../../src/entities/userEntity'

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }