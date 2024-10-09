import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
        <div className='max-w-[1280px] w-[80%] h-[80%] flex flex-col justify-center items-center gap-4'>
            <Image src="/completed.gif" alt="completed" width={100} height={100} />
            <h1 className='text-center text-2xl font-bold'>Course Created Successfully</h1>
            <Link href={"/dashboard"}>
            <Button className='bg-primary'>Go to Dashboard</Button>
            </Link>
        </div>

    </div>
  )
}

export default page