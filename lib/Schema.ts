
export interface User {
  name: string
  email: string
  code: string
  referred: boolean
  phone?: string
}


export type Config = { // defined somewhere inside `mysql` library
  host: string,
  username: string,
  port: number,
}