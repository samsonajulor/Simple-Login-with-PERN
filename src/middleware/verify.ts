import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import ResponseStatus from "../utils/response";
const responseStatus = new ResponseStatus();

// const protectRoute = catchAsync(
//     async (req: any, res: Response, next: NextFunction) => {
//       let token: string | undefined;

//       if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//       ) {
//         token = req.headers.authorization.split(" ")[1];
//       }

//       if (!token) {
//         responseStatus.setError(401, "Please log in to access this route");
//         return responseStatus.send(res);
//       }

//       const decodedToken: any = jwt.verify(
//         token as string,
//         process.env.JWT_SECRET_KEY as string
//       );

//       if (!decodedToken) {
//         responseStatus.setError(401, "Sorry, user no longer exist");
//         return responseStatus.send(res);
//       }
//       console.log(decodedToken)
//       const user = await User.findById(decodedToken.id);
//     //   console.log(user)
//       if (!user) {
//         responseStatus.setError(401, "Sorry, user does not exist");
//         return responseStatus.send(res);
//       }

//       req.user = user;

//       next();
//     }
// );

// export default protectRoute;

const protectRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.header("token");

  // if (!token) {
  //   return res.status(403).json("Not Authorized");
  // }
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    responseStatus.setError(401, "Please log in to access this route");
    return responseStatus.send(res);
  }
  const payload = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);

  req.user = payload;
  next();
});

export default protectRoute;
