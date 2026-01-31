'use server'

import { getUserToken } from "@/app/Helpers/getUserToken"

export async function addToCartAction(productId:string) {
   const token= await getUserToken()
    const response= await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
    method:'post',
    body:JSON.stringify({productId}),
    headers: {
        Token: token!,
        'content-type':"application/json"
    }
   })
   const data=await response.json()
   return data 
}