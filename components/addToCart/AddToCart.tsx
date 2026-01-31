'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'



export default function AddToCart({productId}:{productId:string}) {
  let {getCart,setCartData} = useContext(CartContext)
    const [isLoading,setIsLoading]=useState(false) 
    const session = useSession()
    const router= useRouter()

    async function addProductToCart() {
      if (session.status=='authenticated') {
        setIsLoading(true)
  const data=await addToCartAction(productId) 
   data.status=='success'&& toast.success ('Product added to cart successfully')
   setCartData(data)
   setIsLoading(false)
  }else{
    router.push('/login')
  }
      }
    
    return (
    <>
     <CardFooter className='gap-2'>
    <Button onClick={addProductToCart} className='grow cursor-pointer'>{isLoading?<Loader className='animate-spin'/> :<ShoppingCartIcon/>}Add to Cart</Button>
    <HeartIcon/>
  </CardFooter>
    </>
  )
}

