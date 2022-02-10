export type ResponseData = Record<string, any> | Record<string, any>[]

export interface AuthErrors {
  email?: string
  password?: string
  tweetBody?: string
  whoCanReply?: string
  userId?: string
  image?: string
}
