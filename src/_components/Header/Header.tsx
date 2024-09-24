"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter()
  return (
    <div className='flex justify-between p-5 items-center shadow-md'>
      <Image
        onClick={() => {
          router.push('/')
        }}
        src={"/logo.jpg"} className=' cursor-pointer ' width={150} height={100} alt='Logo' />
      <Button className=' cursor-pointer' onClick={() => {

        router.push('/dashboard')
      }}>Get Started</Button>
    </div>
  )
}

export default Header