import { Book, Clock, LineChart, Stethoscope, Video } from 'lucide-react';
import React from 'react'


interface BasicCourseInfoProps {
    level: string;
    duration: string;
    noOfChapters: string;
    referencedVideo: string;
}

const CourseDetail: React.FC<BasicCourseInfoProps> =({
    level,
    duration,
    noOfChapters,
    referencedVideo,
}) => {
  return (
    <div className=' border-gray-300 border-2 rounded-md p-3 mt-4 mb-4'>
        <div className='flex justify-center md:justify-evenly gap-6 md:gap-3 md:items-center flex-col md:flex-row flex-wrap'>
            <div className='flex items-center gap-3'>
                <LineChart className=' text-primary' size={"30px"} />
                <div>
                    <p className='text-sm text-gray-400 font-semibold'>Level</p>
                    <h1 className='text-lg text-black font-medium'>{level}</h1>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <Clock className=' text-primary' size={"30px"} />
                <div>
                    <p className='text-sm text-gray-400 font-semibold'>Duration</p>
                    <h1 className='text-lg text-black font-medium'>{duration}</h1>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <Book className=' text-primary' size={"30px"} />
                <div>
                    <p className='text-sm text-gray-400 font-semibold'>Chapters</p>
                    <h1 className='text-lg text-black font-medium'>{noOfChapters}</h1>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <Video className=' text-primary'  size={"30px"} />
                <div>
                    <p className='text-sm text-gray-400 font-semibold'>Video</p>
                    <h1 className='text-lg text-black font-medium'>{referencedVideo}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetail