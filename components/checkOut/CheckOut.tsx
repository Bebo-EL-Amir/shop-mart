'use client'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'

export default function CheckOut({ cartId }: { cartId: string }) {
  let detailsInPut = useRef<HTMLInputElement | null>(null)
  let citysInPut = useRef<HTMLInputElement | null>(null)
  let phonesInPut = useRef<HTMLInputElement | null>(null)
  async function checkOutSession() {
    const shippingAddres = {
      details: detailsInPut.current?.value,
      phone: phonesInPut.current?.value,
      city: citysInPut.current?.value,
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
      method: 'post',
      body: JSON.stringify({ shippingAddres }),
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDA2ZTkyNGEwYzBmMjZhNzM5MjczZSIsIm5hbWUiOiJNYXJpb2thbWFsIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjU4MzAyOTAsImV4cCI6MTc3MzYwNjI5MH0.8vwtj0XUFCHj-_tGIIJKPg2ab_H_8LukoSfd9fM5PmQ',
        'Content-type': 'application/JSON'
      }
    })
    const data = await response.json()
    console.log(data);
    if (data.status == 'success') {
      window.location.href = data.session.url
    }

  }
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" className='w-full text-lg mt-4'>proceed to checkout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Make sure that you entered the correct data
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>city</Label>
                <Input ref={citysInPut} id="city" name="city" />
              </div>
              <div className="grid gap-3">
                <Label>Address Details</Label>
                <Input ref={detailsInPut} id="details" name="details" />
              </div>
              <div className="grid gap-3">
                <Label>phone</Label>
                <Input ref={phonesInPut} id="phone" name="phone" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Cash</Button>
              <Button onClick={() => checkOutSession()} type="submit">pay with your bank card</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}
