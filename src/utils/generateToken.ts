import jwt from "jsonwebtoken";

const generateToken = async (statusCode: any, res: any, email: any) => {
  const token: any = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + `${process.env.JWT_EXPIRES_IN}`),
  };
  res.status(statusCode).cookie("token", token, options).json({ success: true, token, email });
};

export default generateToken;
