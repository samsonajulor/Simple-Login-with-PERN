import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { registerValidator, loginValidator } from "../utils/validators";
import ResponseStatus from "../utils/response";
import pool from "../db-config/pool";
import generateToken from "../utils/generateToken";
import sendEmail from "../utils/email";
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
    const { email, password } = req.body;

    const { errors, valid } = registerValidator(email, password);

    if (!valid) {
      return res.status(400).send({ message: Object.values(errors)[0] });
    }

    const name = email.substring(0, email.lastIndexOf("@"));
    const hashPassword = await bcrypt.hash(password, 12);

    //2. saving user details into 'postgres'
    const rows: any = await userRegister.register(name, email, hashPassword);
    const emailToken = await generateEmailToken(email);

    if (process.env.NODE_ENV === "test") {
      return res.json({
        status: "success",
        emailToken,
        rows,
      });
    } else {
      await sendEmail(
        rows.email,
        "Email Verification",
        `<p>Hello ${rows.name},</p><p>Thank you for creating account with us. Please click on this link to verify your email</p>
           Click
           <button><a href= http://localhost:3200/auth/verify/${emailToken}>here</a></button> 
           to verify your email. Thanks`
      );
    }
    responseStatus.setSuccess(201, "Successfully created", {
      emailToken,
    });
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

    if (!user[0].isactive) {
      responseStatus.setError(400, "Please confirm your email");
      return responseStatus.send(res);
    }
    return await generateToken(200, res, {id: user[0].id, email: user[0].email, name: user[0].name });

    // responseStatus.setSuccess(201, "Successfully logged in", {
    //   token,
    //   name: user[0].name,
    // });
    // responseStatus.send(res);
  } catch (error: any) {
    console.error(error.message);
    responseStatus.setError(500, `${error.message}`);
    return responseStatus.send(res);
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  const emailToken: any = jwt.verify(
    req.params.token as string,
    process.env.JWT_SECRET_KEY as string
  );

  const email = emailToken.email;

  if (!emailToken) {
    responseStatus.setError(400, "Invalid token. Please register again");
    responseStatus.send(res);
  }
  const user = await userRegister.confirmEmail(email);
  if (process.env.NODE_ENV === "test") {
    responseStatus.setSuccess(200, "You can now log in", { user });
    return responseStatus.send(res);
  }
  console.log('completed')
  return res.send("completed");
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  responseStatus.setSuccess(200, "You just logged out", {});
  return responseStatus.send(res);
};
// export async function getAllOrder() {
//   const result = await sql`SELECT * FROM user_type`;
//   return { response: "database connected successfully", result };
// }

// export async function confirmOrder(orderid: string) {
//   const [new_order] = await sql`
//   update bookorder
//   set order_status='confirmed'
//   where id=${orderid}
//   returning *
// `;
//   return new Promise((resolve, reject) => {
//     if (new_order) {
//       resolve(new_order);
//     } else {
//       reject('order not found');
//     }
//   });
// }
