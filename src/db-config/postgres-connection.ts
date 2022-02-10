import postgres from "postgres";


export const sql = postgres(process.env.DATABASE_URL as string,{ssl:{rejectUnauthorized:false}})

export const testConnection = async () => {
    try {
        const result = await sql`SELECT * FROM users LIMIT 2`
        console.log('database connected successfully')
        return 'database connected successfully'
    } catch (error) {
        console.error('database connection failed',error)
        // console.error(error)
        return error
        // process.exit(1)
    }
}


// import postgres from "postgres";

// // export const sql = postgres(process.env.DATABASE_URL as string)


// const POSTGRES_USER="postgres"
// const POSTGRES_PWD="secret"
// const POSTGRES_DB="logistics"
// const HOST="localhost"

// // const POSTGRES_USER="xmnivsknktmknv"
// // const POSTGRES_PWD="aaade190eeafe442d706f25bbfc57ca2c7224bbd4ecddfbeb09afb2b18f69f9e"
// // const POSTGRES_DB="ddb2cgl1rgnql9"
// // const HOST="ec2-3-226-165-146.compute-1.amazonaws.com"


// const POSTGRES_URL=`postgres://xmnivsknktmknv:aaade190eeafe442d706f25bbfc57ca2c7224bbd4ecddfbeb09afb2b18f69f9e@ec2-3-226-165-146.compute-1.amazonaws.com:5432/ddb2cgl1rgnql9?sslmode=disable`
// // const POSTGRES_URL=`postgres://${POSTGRES_USER}:${POSTGRES_PWD}@${HOST}:5432/${POSTGRES_DB}?sslmode=disable`
// export const sql = postgres(POSTGRES_URL,{ssl:{rejectUnauthorized:false}})

// export async function testConnection(){
//     try {
//         const result = await sql`SELECT * FROM users LIMIT 2`
//         console.log('database connected successfully', result)
//         return 'database connected successfully'
//     } catch (error) {
//         console.error('database connection failed',error)
//         // console.error(error)
//         return error
//         // process.exit(1)
//     }
// }
// testConnection()