import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
   
      <div className="min-h-screen flex flex-col justify-center items-center">
       <h1 className='font-bolder text-4xl'>ShopMart</h1>
        <h1 className='animate-spin'><Loader/></h1>
      </div>
    
  )
}
