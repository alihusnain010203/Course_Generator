"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { db } from '@/config/db/db'
import { CourseSchema } from '@/config/db/schemas/CourseSchema'
import { and, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import BasicCourseInfo from '@/_components/BasicCourseInfo/BasicCourseInfo'
import CourseDetail from '@/_components/CourseDetail/CourseDetail'
const page = () => {
  const pathname = usePathname()
  const { user } = useUser();
  const [id, setId] = useState(pathname.replace("/create-course/", ""))
  // const [course, setCourse] = useState<{ id: number; courseId: string; name: string; category: string; level: string; courseOutput: string; description: string; referencedVideo: string; noOfChapters: string; duration: string; createdBy: string; userName: string; userEmail: string; UserProfileImage: string; } | undefined>(undefined)

  // const getCourse = async () => {
  // get data from drizzle ORM
  // if (user?.primaryEmailAddress?.emailAddress) {
  //   const data = await db.select().from(CourseSchema).where(and(eq(CourseSchema.courseId, id), eq(
  //     CourseSchema.createdBy, user.primaryEmailAddress.emailAddress
  //   )));
  //   setCourse(data[0])
  //   console.log(data[0])
  // } else {
  //   console.error("User email address is undefined");
  // }

  // }

  // useEffect(() => {
  //   getCourse()
  // }, [pathname, user])
  const course = {
    "id": 14,
    "courseId": "23df4a1e-2bd3-4fbf-9508-2f6c098421b7",
    "name": "Advanced Physiotherapy Techniques",
    "category": "Medical",
    "level": "Advance",
    "courseOutput": "{\"Course_Name\":\"Advanced Physiotherapy Techniques\",\"Level\":\"Advance\",\"Category\":\"Medical\",\"Description\":\"A comprehensive course exploring cutting-edge physiotherapy techniques for treating complex musculoskeletal conditions.\",\"Duration\":12,\"Chapters\":[{\"Chapter_Name\":\"Introduction to Advanced Physiotherapy\",\"about\":\"Overview of advanced physiotherapy principles and their application in clinical practice.\",\"Duration\":1},{\"Chapter_Name\":\"Manual Therapy Techniques\",\"about\":\"In-depth exploration of manual therapy techniques, including mobilization, manipulation, and soft tissue mobilization.\",\"Duration\":1},{\"Chapter_Name\":\"Neurological Rehabilitation\",\"about\":\"Advanced concepts in neurological rehabilitation, including stroke, spinal cord injury, and traumatic brain injury.\",\"Duration\":1},{\"Chapter_Name\":\"Musculoskeletal Ultrasound\",\"about\":\"Practical training in musculoskeletal ultrasound for diagnosis and treatment planning.\",\"Duration\":1},{\"Chapter_Name\":\"Sports Physiotherapy\",\"about\":\"Specialized techniques for treating sports injuries and enhancing athletic performance.\",\"Duration\":1},{\"Chapter_Name\":\"Geriatric Physiotherapy\",\"about\":\"Addressing the unique needs of elderly patients with age-related musculoskeletal conditions.\",\"Duration\":1},{\"Chapter_Name\":\"Pain Management\",\"about\":\"Evidence-based approaches to pain management, including manual therapy, modalities, and exercise.\",\"Duration\":1},{\"Chapter_Name\":\"Postural Analysis and Correction\",\"about\":\"Comprehensive assessment and correction of postural imbalances to improve function and reduce pain.\",\"Duration\":1},{\"Chapter_Name\":\"Advanced Exercise Prescription\",\"about\":\"Designing personalized exercise programs for various conditions and populations.\",\"Duration\":1},{\"Chapter_Name\":\"Research and Evidence-Based Practice\",\"about\":\"Principles of research methodology and its application to clinical practice.\",\"Duration\":1},{\"Chapter_Name\":\"Professional Development and Ethical Considerations\",\"about\":\"Ethical considerations in physiotherapy practice and professional development opportunities.\",\"Duration\":1},{\"Chapter_Name\":\"Case Studies and Clinical Applications\",\"about\":\"Real-world case studies illustrating the application of advanced physiotherapy techniques.\",\"Duration\":1}]}",
    "description": "A comprehensive course exploring cutting-edge physiotherapy techniques for treating complex musculoskeletal conditions.",
    "referencedVideo": "Yes",
    "noOfChapters": "12",
    "duration": "12",
    "createdBy": "ali.husnain.010203@gmail.com",
    "userName": "Ali Husnain",
    "userEmail": "ali.husnain.010203@gmail.com",
    "UserProfileImage": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybVlOUjQ4Z1FVQUVkQ3Y0b2pXWjU3ZXhsM0kifQ"
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='mt-10 px-7 md:px-20 lg:px-44 w-full max-w-[1280px]'>
        <h2 className='text-center font-bold text-2xl text-black'>Course Layout</h2>
        <BasicCourseInfo

          name={course.name}
          category={course.category}

          description={course.description}
          UserProfileImage={user?.imageUrl!}
        />
        <CourseDetail
          level={course.level}
          duration={course.duration}
          noOfChapters={course.noOfChapters}
          referencedVideo={course.referencedVideo}
        />
        {/* <ChapterList chapters={course.courseOutput.Chapters} /> */}

      </div>
    </div>
  )
}

export default page