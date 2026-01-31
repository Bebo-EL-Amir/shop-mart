"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import {signIn} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"

const formSchema = z.object({
email:z.email('invaled email').nonempty('email is required'),
password:z.string().nonempty('password is required').min(6,'min lenght is 6 chars')
  })

type FormFilds= z.infer<typeof formSchema> 

export default function Login() {
  const[isLoading,setIsLoading]=useState(false)
  let searchParams= useSearchParams()
  const form = useForm<FormFilds>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  async function onSubmit(values: FormFilds){
    setIsLoading(true)
    const response= await signIn('credentials',{
   email:values.email,
   password:values.password,
   callbackUrl:'/products',
   redirect:true
    })
   setIsLoading(false)
      
  }

  return (
   <>
   <div className='flex flex-col justify-center items-center min-h-[75vh]'>
    <h1 className='my-3 text-2xl'>Login Now</h1>
    <Card className="p-6 w-sm">
        <Form {...form}>
          {searchParams.get('error')&& <h2 className="text-red-400">{searchParams.get('error')}</h2> }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full cursor-pointer" type="submit">{isLoading&&<Loader className="animate-spin"/>}Submit</Button>
      </form>
    </Form>
    </Card>
   </div>
   </>
  )
}
