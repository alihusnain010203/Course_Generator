"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const Header = () => {
    const router = useRouter()
    return (
        <div className='flex justify-between p-5 items-center shadow-md'>
              <Image
        onClick={() => {
          router.push('/')
        }}
        src={"/logo-short.png"} className=' cursor-pointer ' width={50} height={30} alt='Logo' />
            <UserButton />
        </div>
    )
}

export default Header