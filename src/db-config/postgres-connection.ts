import postgres from 'postgres'

export const sql = postgres(process.env.DATABASE_URL as string, {
  ssl: { rejectUnauthorized: false },
})

const testConnection = async () => {
  try {
    const result = await sql`SELECT * FROM users LIMIT 2`
    console.log('database connected successfully')
    return 'database connected successfully'
  } catch (error) {
    console.error('database connection failed', error)
    // console.error(error)
    return error
    // process.exit(1)
  }
}

export default testConnection
