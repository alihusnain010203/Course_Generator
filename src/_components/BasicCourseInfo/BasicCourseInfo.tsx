import { Button } from '@/components/ui/button';
import { PuzzleIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface BasicCourseInfoProps {
    name: string;
    category: string;
    description: string;
    UserProfileImage: string;
}

const BasicCourseInfo: React.FC<BasicCourseInfoProps> = ({
    name,
    category,
    description,
    UserProfileImage
}) => {
    return (

        <div className=' border-gray-200 border-2 rounded-md p-3 '>
            <div className='flex justify-between p-3 gap-10 flex-col-reverse md:flex-row'>
                {/* Name & Description */}
                <div className='flex flex-1 flex-col gap-4'>
                    <h1 className='text-2xl font-bold text-black'>{name}</h1>
                    <p className='text-lg text-gray-500'>{description}</p>
                    <p className='font-extrabold text-base text-primary flex gap-2'><PuzzleIcon/> {category}</p>
                    <Button className='mt-5'>Start</Button>
                </div>
                {/* Image */}
                <div className='flex flex-1 justify-center md:justify-end relative'>
                    <Image src={UserProfileImage} alt='User Profile' className=' rounded-md' width={300} height={300} />
                    {/* Overlay On Image */}
                    <div className='absolute top-0 md:right-0 w-[300px] h-[300px] bg-black bg-opacity-50 rounded-md'>
                        {/* Upload Image Heading In center */}
                        <div className='flex justify-center items-center h-full'>
                            <h1 className='text-2xl text-white'>Upload Course Image</h1>
                            </div>
                    </div>
                </div>
            </div>
        </div>
     
    )
}

export default BasicCourseInfo