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
import { CustomAlertDialog } from '@/_components/AlertDialog/AlertDialog'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [courseLoading, setCourseLoading] = useState(true);
  const { user } = useUser();
  const [id, setId] = useState(pathname.replace("/create-course/", ""))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
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
      setCourseLoading(false)
    } else {
      console.error("User email address is undefined");
      setCourseLoading(false)
    }

  }

  useEffect(() => {
    getCourse()
  }, [pathname, user])


  return (
    <div className='flex justify-center items-center w-full min-h-[100vh]'>
      {
        courseLoading ?
          <Image src={"/loading.gif"} alt="loading" width={100} height={100} />
          : <div className='mt-10 flex flex-col gap-[20px] px-7 md:px-20 lg:px-44 w-full max-w-[1280px] mb-3'>
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
                  onClick={async () => {
                    setLoading(true);

                    try {
                      if (!course.courseOutput) {
                        throw new Error("Course data is missing.");
                      }

                      let chapters;
                      try {
                        chapters = JSON.parse(course.courseOutput).Chapters;
                      } catch (parseError) {
                        throw new Error("Invalid JSON format.");
                      }

                      if (chapters) {
                        let chaptersContent: any[] = [];

                        for (const chapter of chapters) {
                          try {
                            const result = await generateChaptersContent(
                              chapter.Course_Name,
                              chapter.about,
                              chapter.Duration,
                              course.name
                            );
                          

                            const getVideoLink = await fetch(
                              `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${chapter.Chapter_Name}+${course.name}&key=${process.env.NEXT_PUBLIC_YOUTUBE}&videoDuration=medium`
                            );
                            const videoData = await getVideoLink.json();
                  
                            
                            const parsedResult = JSON.parse(JSON.stringify(result));
         
                            
                          
                            const embedVideoLink = "https://www.youtube.com/embed/" + videoData.items[0].id.videoId;
                            
                            const completeChapter = {
                              parsedResult: parsedResult,
                              videoLink: embedVideoLink, 
                            };

                            chaptersContent.push(completeChapter);
                          } catch (error) {
                            console.error('Error generating chapter content:', error);
                            setError("Something Went Wrong. Try Again");
                          }
                        }

                        await db.update(CourseSchema).set({
                          Chapters: JSON.stringify(chaptersContent)
                        }).where(and(
                          eq(CourseSchema.courseId, id),
                          eq(CourseSchema.createdBy, user?.primaryEmailAddress?.emailAddress || '')
                        ));

                        router.replace("/completed");
                      }
                    } catch (error) {
                      console.error(error);
                      setError(String(error) || "Something went wrong.");
                    } finally {
                      setLoading(false);
                    }
                  }}

                >
                  Finish Course Setup
                </Button>
                {error &&
                  <p className='text-xl text-red-400'>{error}</p>}
                <CustomAlertDialog loading={loading} text="Wait AI Generating Chapter Content For You" />
              </>
            }

          </div>
      }


    </div>
  )
}

export default page