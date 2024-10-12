"use client";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useInView } from 'react-intersection-observer'

// Feature data
const features = [
  {
    title: "Select your learning path",
    description: "Choose from a variety of learning paths to get started."
  },
  {
    title: "Video Lectures(YT)",
    description: "Watch video lectures from top educators and learn anytime, anywhere."
  },
  {
    title: "Generate Notes",
    description: "Get your notes easily."
  }
];

const Featured = () => {
  // Intersection Observer Hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.2     // Element needs to be 20% visible to trigger the animation
  });

  return (
    <div className='w-full flex flex-col items-center mt-5'>
      {/* Title */}
      <h1 className='text-primary text-4xl font-bold text-center'>Features</h1>
      
      {/* Features Section */}
      <div className='max-w-[1280px] flex flex-col md:flex-row justify-between items-center' ref={ref}>
        {/* Left Column with Features */}
        <div className={`flex flex-col h-full gap-10 ${inView ? 'animate-slideInLeft' : 'opacity-0'}`}>
          {features.map((feature, index) => (
            <div key={index} className='flex flex-col gap-3 p-3'>
              <h1 className='text-2xl text-primary font-bold'>{feature.title}</h1>
              <p className='text-gray-500'>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column with Image */}
        <div className={`flex justify-center items-center ${inView ? 'animate-slideInRight' : 'opacity-0'}`}>
          <img src="/book.png" alt="Feature" className='w-[300px] h-[300px]' />
        </div>
      </div>

      {/* Button to Navigate to Dashboard */}
      <div className='mt-5 mb-10'>
        <Link href="/dashboard">
          <Button className='bg-primary text-white'>Generate Course</Button>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
