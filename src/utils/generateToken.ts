import jwt from "jsonwebtoken";
import {Request, Response} from 'express'

const generateToken = async (statusCode: any, res: Response,  email: any) => {
  const token: any = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + `${process.env.JWT_EXPIRES_IN}`),
  };
  // req.header('emailToken', token)
  res.status(statusCode).cookie("token", token, options).json({ success: true, email });
};

export default generateToken;
