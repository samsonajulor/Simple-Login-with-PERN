import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { registerValidator, loginValidator } from "../utils/validators";
import ResponseStatus from "../utils/response";
import generateToken from "../utils/generateToken";
import userRegister from "../model/auth";
import jwt from "jsonwebtoken";

const responseStatus = new ResponseStatus();

const generateEmailToken = async (email: string) => {
  const token: any = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
  return token;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { lastname, firstname, email, password } = req.body;

    const { errors, valid } = registerValidator(email, password);

    if (!valid) {
      return res.status(400).send({ message: Object.values(errors)[0] });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    //2. saving user details into 'postgres'
    const rows: any = await userRegister.register(firstname, lastname, email, hashPassword);
    const accessToken = await generateEmailToken(email);

    if (process.env.NODE_ENV === "test") {
      return res.json({
        status: "success",
        rows,
        firstname,
        lastname
      });
    }
    res.header('accessToken', accessToken)
    console.log(res.header, 'this is the response header')
    console.log(res, 'this is the response')
    responseStatus.setSuccess(201, 'Successfully created', {
      firstname,
      lastname,
      accessToken,
    })
    return responseStatus.send(res);
  } catch (error: any) {
    console.error(error.message);
    responseStatus.setError(500, `${error.message}`);
    return responseStatus.send(res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { errors, valid } = loginValidator(email, password);

    if (!valid) {
      return res.status(400).send({ message: Object.values(errors)[0] });
    }

    const user = await userRegister.login(email);

    if (user.length === 0) {
      return res.status(401).json("User doesn't exits");
    }

    const match = await bcrypt.compare(password, user[0].password);

    if (!match) {
      return res.status(401).json("Password is Incorrect");
    }
    
    return await generateToken(200, res, {id: user[0].id, email: user[0].email, name: user[0].firstname });

  } catch (error: any) {
    console.error(error.message);
    responseStatus.setError(500, `${error.message}`);
    return responseStatus.send(res);
  }
};



export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  responseStatus.setSuccess(200, "You just logged out", {});
  return responseStatus.send(res);
};

