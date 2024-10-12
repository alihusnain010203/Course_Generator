"use client";

import { AccordionDemo } from '@/_components/ChapterAcordian/ChapterAccordian';
import CourseDetail from '@/_components/CourseDetail/CourseDetail';
import Header from '@/_components/DashboardHeader/DashboardHeader';
import ViewPageChapters from '@/_components/ViewPageChapters/ViewPageChapters';
import { db } from '@/config/db/db';
import { CourseSchema } from '@/config/db/schemas/CourseSchema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewCourse = () => {
  const [course, setCourse] = useState<null | any>(null);
  const [chapters, setChapters] = useState<any[] | null>(null);
  const id = String(useParams().courseId);

  const getCourse = async () => {
    const res = await db.select().from(CourseSchema).where(eq(CourseSchema.courseId, id));
    setCourse(res[0]);
    setChapters(JSON.parse(res[0].Chapters))
}

  useEffect(() => {
    getCourse()

  }, []);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <Header />

      <div className='w-full flex justify-center items-center'>
        <div className='max-w-[1280px] w-full gap-3 flex flex-col mt-6 justify-center items-center '>
          <h1 className='text-2xl font-bold'>{course.name}</h1>
          <p className='text-gray-500 p-3 text-center '>
            {course.description}
          </p>
          <Image src={course.courseImage || "/book.png"} alt='course' className='w-[90%] md:w-[40%] ' width={1280} height={720} />
          <div className='w-[90%] md:w-[80%]'>
            <CourseDetail
              level={course.level}
              duration={course.duration}
              noOfChapters={course.noOfChapters}
              referencedVideo={course.referencedVideo}
            />
          </div>
          {/* Chapters */}
          <div className='w-[90%] md:w-[80%]'>
            <h1 className='text-2xl font-bold'>Chapters</h1>
            <ViewPageChapters id={id}/>
          </div>
        </div>

      </div>

    </div>
  )
};

export default ViewCourse;
