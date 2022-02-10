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

export const twitValidate = (
  tweet_body: string,
  image: string,
  who_can_reply: string
) => {
  const errors: AuthErrors = {};

  if (tweet_body.trim() === "" && image.trim() === "") {
    errors.tweetBody = "Your tweet body can not be empty";
  }
  if (tweet_body.trim().length > 240) {
    errors.tweetBody = "words must not be more than 250 characters";
  }
  if (who_can_reply.trim() === "") {
    errors.whoCanReply = "who can reply must be specified";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
