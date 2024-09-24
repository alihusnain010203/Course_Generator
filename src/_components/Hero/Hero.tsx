import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl leading-10 font-extrabold text-primary  sm:text-5xl">
            AI Course Generator
            <strong className=" text-black text-3xl font-semibold mt-[5px] sm:block"> Custom Learning Path, Powered By AI </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Unlock Personalized education with AI-driven course creation. Tailor your learning to fit your unique goals and pace
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href='/dashboard'
            >
              <Button>
                Get Started
              </Button>

            </Link>


          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero