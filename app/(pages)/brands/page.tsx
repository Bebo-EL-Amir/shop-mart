import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Image from 'next/image'
import { BrandI} from '@/interfaces'
import Link from 'next/link'

export default async function Brands() {
  
  const response=await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  const {data:Brands}:{data:BrandI[]} = await response.json()
 
 return <>
  <h1 className='mb-3'>Brands</h1>
  <div className="container">
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
    
   {Brands.map((brand)=> <div key={brand._id}>  
  <Card>
    <Link href={'/brands/'+brand._id}>
  <CardContent>
    <Image src={brand.image} className='w-full' alt='brand.image' height={300} width={300} />
  </CardContent>
  <CardFooter>
    <p>{brand.name}</p>
  </CardFooter>
</Link>
</Card>
      
</div>)}
    </div>
  </div>
  </>
}
