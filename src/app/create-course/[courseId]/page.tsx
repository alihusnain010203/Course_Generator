"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { db } from '@/config/db/db'
import { CourseSchema } from '@/config/db/schemas/CourseSchema'
import { and, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import BasicCourseInfo from '@/_components/BasicCourseInfo/BasicCourseInfo'
import CourseDetail from '@/_components/CourseDetail/CourseDetail'
import ChapterSection from '@/_components/ChaptersSection/ChapterSection'
import { Button } from '@/components/ui/button'
import { generateChaptersContent } from '@/config/AIModel'
const page = () => {
  const pathname = usePathname()
  const { user } = useUser();
  const [id, setId] = useState(pathname.replace("/create-course/", ""))
  // const [courseImg,setCourseImg]=useState<null|string>(null)

  const updateCourseImage = async (imgUrl: string) => {
    if (!imgUrl) return
    if (!user || !user.primaryEmailAddress) {
      console.error("User or user email address is undefined");
      return;
    }

    const updateCourse = await db
      .update(CourseSchema)
      .set({
        courseImage: imgUrl   // Update the age
      })
      .where(and(eq(CourseSchema.courseId, id), eq(
        CourseSchema.createdBy, user.primaryEmailAddress.emailAddress
      )))
      .returning();

    return true;

  }
  const [course, setCourse] = useState<{ id: number; courseId: string; name: string; category: string; level: string; courseOutput: string; description: string; referencedVideo: string; noOfChapters: string; duration: string; createdBy: string; userName: string; userEmail: string; courseImage: string; } | undefined>(undefined)

  const getCourse = async () => {
    // get data from drizzle ORM
    if (user?.primaryEmailAddress?.emailAddress) {
      const data = await db.select().from(CourseSchema).where(and(eq(CourseSchema.courseId, id), eq(
        CourseSchema.createdBy, user.primaryEmailAddress.emailAddress
      )));
      setCourse(data[0])
      console.log(data[0])
    } else {
      console.error("User email address is undefined");
    }

  }

  useEffect(() => {
    getCourse()
  }, [pathname, user])


  return (
    <div className='flex justify-center items-center'>
      <div className='mt-10 flex flex-col gap-[20px] px-7 md:px-20 lg:px-44 w-full max-w-[1280px]'>
        <h2 className='text-center font-bold text-2xl text-black'>Course Layout</h2>
        <BasicCourseInfo

          name={course?.name}
          category={course?.category}

          description={course?.description}
          updateCourse={updateCourseImage}
          UserProfileImage={user?.imageUrl!}
        />
        <CourseDetail
          level={course?.level}
          duration={course?.duration}
          noOfChapters={course?.noOfChapters}
          referencedVideo={course?.referencedVideo}
        />
        {course?.courseOutput &&
        <>
          <ChapterSection
            chapters={JSON.parse(course.courseOutput).Chapters}
          />
        
        <Button className='bg-primary'
         onClick={()=>{
          let chapters=JSON.parse(course.courseOutput).Chapters;
          if(chapters){
            // loop over each chapter and store in array
            let chaptersContent:any[]=[]
            chapters.map(async(chapter:any,index:any)=>{
              const result =await generateChaptersContent(
                chapter.Course_Name,
                
                chapter.about,
                chapter.Duration,
                course.name
              )
              console.log(result)
              chaptersContent.push(result)
            })
            // console.log(chaptersContent)

          }
         }}
        >
          Finish Course Setup
        </Button></>
}

      </div>
    </div>
  )
}

export default page