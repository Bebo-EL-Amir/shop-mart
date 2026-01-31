import AddToCart from '@/components/addToCart/AddToCart';
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandI, ProductI } from '@/interfaces'
import { HeartIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function BrandDetails({ params }: { params:Params }) {
  const { brandId } = await params;

  const brandRes = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
  const brandData = await brandRes.json();

  const productsRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
  const productsData = await productsRes.json();

  const brand = brandData.data;
  const products = productsData.data;

  return (
    <div className="p-6">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">{brand?.name}</h1>
        <p className="text-gray-500">Products from this brand</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {products?.length > 0 ? (products.map((product: ProductI) => (<div key={product._id} >
              <Card>
    <Link href={'/products/'+ product.id}>
  <CardHeader>
    <Image src={product.imageCover} className='w-full' alt='' height={300} width={300}/>
     <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle> {product.title.split(' ',2).join(' ')} </CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className='flex'>
 <MyStarIcon/>
 <MyStarIcon/>
 <MyStarIcon/>
 <MyStarIcon/>
 <MyStarIcon/>  
      <p>{product.ratingsAverage}</p>
    </div>
    <p className='pt-1'>Price : <span className='font-bold'>{product.price}</span> EGP</p>
  </CardContent>
</Link>
 <AddToCart productId={product._id} />
            </Card>
              </div>))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400 text-xl">No products available for this brand yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}