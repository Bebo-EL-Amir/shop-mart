import { ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import { Button } from '@/components/ui/button'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'

import ProductSilder from '@/components/productSlider/productSilder'
import AddToCart from '@/components/addToCart/AddToCart'

export default async function ProductDetails({params}:{params:Params}) {
  let{productId}=await params
  
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+ productId)
  const {data:Product}:{data:ProductI}=await response.json()

  return (
    <>
    <Card className='grid md:grid-cols-2 items-center w-200 mx-auto justify-center mt-20'>
 <div className='mx-auto'>
  
  <ProductSilder images={Product.images} altContent={Product.title}/>
 </div>
 <div>
   <CardHeader>
    <CardDescription>{Product.brand.name}</CardDescription>
    <CardTitle>{Product.title}</CardTitle>
     <CardDescription>{Product.description}</CardDescription>
    
  </CardHeader>
  <CardContent>
     <CardDescription>{Product.category.name}</CardDescription>
     <div className='flex gap-1 mt-3'>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <p>({Product.ratingsQuantity})</p>
     </div>
     <div className='mt-3'>
      <p className='font-bold'>price:<span>{Product.price} EGP</span></p>
  
     </div>
  </CardContent>
 <AddToCart productId={Product._id}/>
 </div>
</Card>
    </>

  )
}

