import { CircleChevronDown, Clock1 } from 'lucide-react';
import React from 'react'




const ChapterSection = ({ chapters = [] }:
    { chapters?: { Chapter_Name: string, about: string, Duration: number }[] }
) => {
    const [chap, setChapters] = React.useState(chapters)
    return (
        <div className='mb-2'>
            <h1 className='text-xl font-semibold'>Chapters</h1>
            {
                chap.map((chapter:
                    { Chapter_Name: string, about: string, Duration: number }
                    , index: number) => {
                    return (
                        <ChapterHolder
                            chapterHeading={chapter.Chapter_Name}
                            ChapterDesc={chapter.about}
                            Duration={chapter.Duration.toString()}
                            index={index + 1}
                            key={index}
                        />
                    )
                })
            }
        </div>
    )
}


interface ChapterHolderProps {
    chapterHeading: string;
    ChapterDesc: string;
    Duration: string;
    index: number;
}

const ChapterHolder: React.FC<ChapterHolderProps> = ({
    chapterHeading,
    ChapterDesc,
    Duration,
    index,
}) => {
    return (
        <div className='flex md:items-center gap-1 md:gap-4 border-b-2 border-gray-200 p-2'>
            {/* Numbering */}
            <div className='flex-none md:mt-0 p-1 md:p-2 h-[30px] md:h-[40px] w-[30px] md:w-[40px] rounded-full bg-primary text-white text-center'>
                <p>{index}</p>

            </div>
            {/* Title & Description */}
            <div className=' flex flex-col gap-2'>
                <h1 className='text-lg font-semibold'>{chapterHeading}</h1>
                <p className='text-gray-500'>{ChapterDesc}</p>
                {/* duration */}

                <p className='text-primary flex gap-1 font-semibold items-center'> <Clock1 />   {Duration}</p>
            </div>
            {/* Arrow */}
            <div className='flex-grow flex items-end text-gray-300 md:items-start justify-end'>
                <CircleChevronDown />
            </div>


        </div>
    );
}

export default ChapterSection