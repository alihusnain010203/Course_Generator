import Header from '@/_components/Header/Header'
import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <Header />
      <div className='flex justify-around h-screen items-center'>
        <Image src={"/logo.jpg"} width={150} height={100} alt='Logo' />
        <SignUp />
      </div> </>

  )
}