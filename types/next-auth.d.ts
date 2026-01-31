import { UserResponse } from "@/interfaces"


declare module "next-auth" {
  
  interface Session {
      user:UserResponse
  }
  interface User {
    user: UserResponse
    token: string
  }
}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  
  interface JWT extends User{}
}