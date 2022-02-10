import { sql } from "../db-config/postgres-connection";

async function register(name: string, email: string, password: string) {
  const [newUser] = await sql`
    insert into users (
    name, email, password
    ) values (
    ${name}, ${email}, ${password}
    )
    returning *
  `;
//   return new Promise((resolve, reject) => {
//     if (newUser) {
//       resolve(newUser);
//     } else {
//       reject(newUser);
//     }
//   });
        return newUser;
}

async function login(email: string) {
   const result = await sql`select * from users
   where email=${email}`
  return result;
}

async function confirmEmail(email: string, isActive=true) {
    
    const [newUser] = await sql`
    update users
    set isactive = ${isActive}
    where email=${email}
  `;
  console.log(newUser)
    return newUser;
  }

export default { register, login, confirmEmail };
