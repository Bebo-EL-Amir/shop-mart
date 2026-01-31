'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image"
import React from 'react'


export default function ProductSilder({images,altContent}:{images:string[],altContent:string}) {
  return (
    <>
     <Carousel plugins={[Autoplay({delay: 1000,}), ]}  opts={{loop: true, }}>
  <CarouselContent>
   {images.map((img,index)=><CarouselItem key={index}><Image src={img} alt={altContent} className='w-full' width={200} height={200}/></CarouselItem>
    )} 
  </CarouselContent>
</Carousel>
    </>
  )
}
