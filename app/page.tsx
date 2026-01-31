import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
   <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
     <div className="">
      <h1 className="font-bold text-6xl text-black mb-6"> Welcome to shopMart</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service</p>
    </div>
    <div>
    <Link href={'/products'}><Button className="w-50 mx-4 cursor-pointer">Shop now</Button> </Link>
     <Link href={'/categories'}><Button className="w-50 cursor-pointer" variant="outline">browse categories</Button></Link>
    </div>
    
   </div>
    </>
  );
}
