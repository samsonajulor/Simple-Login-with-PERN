import { sql } from "../db-config/postgres-connection";

async function register(firstname: string, lastname: string, email: string, password: string) {
  const [newUser] = await sql`
    insert into users (
    firstname, lastname, email, password
    ) values (
    ${firstname}, ${lastname}, ${email}, ${password}
    )
    returning *
  `
        return newUser;
}

async function login(email: string) {
   const result = await sql`select * from users
   where email=${email}`
  return result;
}

export default { register, login };
