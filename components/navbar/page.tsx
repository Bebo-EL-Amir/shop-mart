'use client'
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '../context/CartContext'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
 const session=useSession() 
 const{cartData,isLoading}= useContext(CartContext)
  return (
    <>
  <nav className='bg-neutral-100 shadow py-3 text-2xl font-semibold sticky top-0'>
    <div className="container mx-auto">
      <div className="flex items-center justify-around">
       <h1><Link href={'/'}>shopMart</Link></h1>
            <NavigationMenu>
  <NavigationMenuList>
       <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">products</Link>
      </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
        <Link href="/categories">categories</Link>
      </NavigationMenuLink>
      </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<div className="flex items-center gap-1">
  {session.status=='authenticated'&& <h2>Hi {session.data.user.name}</h2>}
  <DropdownMenu>
  <DropdownMenuTrigger><UserIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {session.status=='authenticated'? 
    <> <Link href={'/profile'}>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    </Link>
    <DropdownMenuItem onClick={()=>signOut(
      {callbackUrl:'/'})}>Logout</DropdownMenuItem>
    </>:
    <>
     <Link href={'/login'}>
    <DropdownMenuItem>Login</DropdownMenuItem>
    </Link>
    <Link href={'/register'}>
    <DropdownMenuItem>Register</DropdownMenuItem>
    </Link>
   </>
    }
   
  </DropdownMenuContent>
</DropdownMenu>

{session.status=='authenticated'&& 
<div className='relative'>
  <Link href={'/cart'} >
  <ShoppingCartIcon/>
        <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono tabular-nums">
         {isLoading?<Loader className='animate-spin' />:cartData?.numOfCartItems}
        </Badge>
        </Link>
</div>
}
      </div>
    </div>
    </div>
  </nav>
    </>
  )
}
