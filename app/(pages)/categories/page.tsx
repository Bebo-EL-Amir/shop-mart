import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { CategoryI } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {
 const response=await fetch('https://ecommerce.routemisr.com/api/v1/categories')
 const {data:Categories}:{data:CategoryI[]}=await response.json()
  return <>
  <h1 className='mb-3'>Catogries</h1>
  <div className="container">
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
    
  {Categories.map((category)=> <div key={category._id}>
    <Card>
    <Link href={'/categories/'+category._id}>
  <CardContent>
    <Image src={category.image} className='w-full' alt='category.image' height={300} width={300} />
  </CardContent>
  <CardFooter>
    <p>{category.name}</p>
  </CardFooter>
</Link>
</Card>
      
</div>)}
    </div>
  </div>


  </>
}
