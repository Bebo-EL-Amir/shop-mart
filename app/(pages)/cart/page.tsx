'use client'
import Loading from '@/app/loading'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse, ProductI } from '@/interfaces'
import { Loader, Phone, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckOut from '@/components/checkOut/CheckOut'

export default function Cart() {
      let{isLoading,cartData,getCart,setCartData}=useContext(CartContext)
       const[removingId,setRemovingId]=useState<string|null>(null)
       const[updatingId,setUpdatingId]=useState<string|null>(null)
       const[isClearing,setIsClearing]=useState<boolean>(false)
     
       useEffect(() => {
    if (cartData == null || typeof cartData.data.products?.[0]?.product === 'string') {
      getCart();}
      }, []);
      
      async function removeCartItem(productid:string) {
        setRemovingId(productid)
         const response= await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productid,{
          method:'DELETE',
          headers:{
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDA2ZTkyNGEwYzBmMjZhNzM5MjczZSIsIm5hbWUiOiJNYXJpb2thbWFsIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjU4MzAyOTAsImV4cCI6MTc3MzYwNjI5MH0.8vwtj0XUFCHj-_tGIIJKPg2ab_H_8LukoSfd9fM5PmQ'
          }
        })
       const data:CartResponse = await response.json ()
       if (data.status=='success') {
        toast.success('item removed from cart')
        setCartData(data)
       }
        setRemovingId(null)
      }

        async function updateCartItem(productid:string,count:number) {
        setUpdatingId(productid)
         const response= await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productid,{
          method:'put',
          body: JSON.stringify({count}),
          headers:{
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDA2ZTkyNGEwYzBmMjZhNzM5MjczZSIsIm5hbWUiOiJNYXJpb2thbWFsIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjU4MzAyOTAsImV4cCI6MTc3MzYwNjI5MH0.8vwtj0XUFCHj-_tGIIJKPg2ab_H_8LukoSfd9fM5PmQ',
          'Content-Type':'application/json'
          }

        })
       const data:CartResponse = await response.json ()
       console.log(data);
       if (data.status=='success') {
        toast.success('item updated in cart')
        setCartData(data)
       }
        setUpdatingId(null)
      }

         async function clearCart() {
        setIsClearing(true)
         const response= await fetch('https://ecommerce.routemisr.com/api/v1/cart/',{
          method:'DELETE',
          headers:{
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDA2ZTkyNGEwYzBmMjZhNzM5MjczZSIsIm5hbWUiOiJNYXJpb2thbWFsIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjU4MzAyOTAsImV4cCI6MTc3MzYwNjI5MH0.8vwtj0XUFCHj-_tGIIJKPg2ab_H_8LukoSfd9fM5PmQ',
          }

        })
       const data:CartResponse = await response.json()
       if (data.message=='success') {
        toast.success('Cart Cleared successfully')
        setCartData(null)
       }
        setIsClearing(false)
      }

       

  return (
    <>
   {isLoading || !cartData || !cartData.data?.products ? (<Loading />) : cartData.numOfCartItems > 0 ?(
  <div className="container mx-auto py-6 px-4">
      <h1 className='text-3xl font-bold tracking-tight'> shopping cart</h1>
      <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} in your cart</p>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
      <div className="lg:col-span-2 space-y-4">
      {cartData?.data.products.map((item) => 
    <div key={item._id} className='flex gap-4 round-xl border p-4 shadow-sm bg-card'>
          <img src={item.product.imageCover} alt={item.product.title}
          className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28'/>
          <div className='flex-1'>
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
              <div className='' >
                <h3 className='font-smibold text-base md:text-lg line-clamp-2'>{item.product.title}</h3>
                <p className='text-sm text-muted-foreground mt-1'>
                  {item.product.brand.name} 
                  {item.product.category.name}
                  </p>
              </div>
              <div className='text-right'>
                <div className='font-semibold'>
                 EG {item.price}
                </div>
              </div>
            </div>
            <div className='mt-3 flex item-center justify-between'>
              <div className='flex items-center gap-2'>
                <Button onClick={()=>updateCartItem(item.product._id,item.count-1)} disabled={item.count==1} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent'>
                  -
                </Button>
                <span className='w-6 text-center font-meduim'>
                 {updatingId==item.product._id ? <Loader className='animate-spin mx-auto'/>:item.count}
                </span>
                <Button aria-label='increase'onClick={()=>updateCartItem(item.product._id,item.count+1)} className='size-8 rounded-lg border hover:bg-accent'>
                  +
                </Button>
                </div>
                <div>
                <Button onClick={()=>removeCartItem(item.product._id)} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline hover:bg-white items-center bg-white'>
                  {removingId==item.product._id && <Loader className='animate-spin'/>}
                  Remove
                </Button>
                </div>
              </div>
            </div>
        </div>)}

       
      </div>
   {/* order summary */}
    <div className='lg:col-span-1 sticky top-18'>
      <div className='rounded-xl border p-5 shadow-sm'>
        <h2 className='text-lg font-semibold'>Order summary</h2>
        <div className='mt-4 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className=' text-sm text-muted-foreground'>Subtotal : {cartData?.numOfCartItems} items</span>
            <span className='font-semibold'> {cartData?.data.totalCartPrice}</span>
            </div>
            <div className='flex items-center justify-between'>
            <span className=' text-sm text-muted-foreground'>shipping</span>
            <span className=' text-emerald-600 font-meduim'>free</span>
            </div>
            </div>
      </div><div className='my-4 border-t'>
        <div className='flex items-center justify-between'>
          <span className='text-base font-semibold'>total</span>
          <span className='text-base font-semibold'>{cartData?.data.totalCartPrice}</span>
        </div>
       <CheckOut cartId={cartData?.cartId!}/>
        <Button className='w-full text-lg mt-2'>continue shopping</Button>
        </div>
        <Button variant={'outline'} onClick={clearCart} className='mt-2 ms-auto text-destructive hover:text-destructive flex'>{isClearing?<Loader className='animate-spin'/>: <Trash2/>}  Clear Cart </Button>
      </div>
    </div>
    </div>) :
    <div className='flex min-h-[75vh] items-center justify-center flex-col'>
      <h2 className='text-2xl my-4'>Your Cart is Empty</h2>
      <Link href={'/products'}><Button className='cursor-pointer'>Shop Now</Button></Link>
    </div>
}
    </>
  )
}
