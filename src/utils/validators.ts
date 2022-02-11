import { AuthErrors } from "../types/types";

export const registerValidator = (email: string, password: string) => {
  const errors: AuthErrors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const loginValidator = (email: string, password: string) => {
  const errors: AuthErrors = {};

  if (email.trim() === "") {
    errors.email = "Username must not be empty";
  }
  if (!password || password.length < 6) {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

