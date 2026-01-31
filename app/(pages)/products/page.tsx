import { ProductI } from '@/interfaces';
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
import Image from 'next/image';
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { HeartIcon, ShoppingCartIcon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AddToCart from '@/components/addToCart/AddToCart';

export default async function Products() {
 const response= await fetch('https://ecommerce.routemisr.com/api/v1/products')
 const {data:Products}:{data:ProductI[]}= await response.json()
  return (
    <>
 <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-3">
   {Products?.map ((Product)=><div key={Product.id}>
      <Card>
    <Link href={'/products/'+ Product.id}>
  <CardHeader>
    <Image src={Product.imageCover} className='w-full' alt='' height={300} width={300}/>
     <CardDescription>{Product.brand.name}</CardDescription>
    <CardTitle> {Product.title.split(' ',2).join(' ')} </CardTitle>
    <CardDescription>{Product.category.name}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className='flex'>
 <MyStarIcon/>
 <MyStarIcon/>
 <MyStarIcon/>
 <MyStarIcon/>
 <MyStarIcon/>  
      <p>{Product.ratingsAverage}</p>
    </div>
    <p className='pt-1'>Price : <span className='font-bold'>{Product.price}</span> EGP</p>
  </CardContent>
</Link>
 <AddToCart productId={Product._id} />
</Card>
</div>)}
 </div>
    </>
  )
}
