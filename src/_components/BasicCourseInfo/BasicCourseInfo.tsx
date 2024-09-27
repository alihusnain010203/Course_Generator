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

        <div className=' border-gray-300 border-2 rounded-md p-3 '>
            <div className='flex justify-between p-3 gap-10 flex-col-reverse md:flex-row'>
                {/* Name & Description */}
                <div className='flex flex-1 flex-col gap-4'>
                    <h1 className='text-2xl font-bold text-black'>{name}</h1>
                    <p className='text-lg text-gray-500'>{description}</p>
                    <p className='font-extrabold text-base text-primary flex gap-2'><PuzzleIcon/> {category}</p>
                    <Button className='mt-5'>Start</Button>
                </div>
                {/* Image */}
                <div className='flex flex-1 justify-center md:justify-end'>
                    <Image src={UserProfileImage} alt='User Profile' className=' rounded-full' width={300} height={300} />
                </div>
            </div>
        </div>
     
    )
}

export default BasicCourseInfo