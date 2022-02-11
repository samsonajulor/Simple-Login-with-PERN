import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import ResponseStatus from "../utils/response";
const responseStatus = new ResponseStatus();

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
