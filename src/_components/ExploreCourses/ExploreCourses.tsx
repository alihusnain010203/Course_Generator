"use client";
import React, { useEffect, useState } from 'react'
import CourseCard from '../Course_Card/CourseCard'
import { db } from '@/config/db/db';
import { CourseSchema } from '@/config/db/schemas/CourseSchema';
import { useUser } from '@clerk/nextjs';
import { and, count, eq } from 'drizzle-orm';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
const CourseSection = () => {
    const [courses, setCourses] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [singlePageCoursesLimit, setSinglePageCoursesLimit] = useState(6);
    const [totalCourses, setTotalCourses] = useState(0);
    const { user } = useUser();
    const getCourses = async () => {
        if (user && user.primaryEmailAddress) {

        
            const res = await db
                .select()
                .from(CourseSchema)
                .limit(singlePageCoursesLimit) // the number of rows to return
                .offset((currentPage - 1) * singlePageCoursesLimit)
                setCourses(res);
                setLoading(false);
            }
          


    }
    const handleDelete = async (id: string) => {
        if (user && user.primaryEmailAddress) {
            await db.delete(CourseSchema);
            getCourses();
        }
        return true
    }
    const countCourses = async () => {
        const total=  await db.select({ count: count()  }).from(CourseSchema);
        setTotalCourses(total[0].count);
        setTotalPages(Math.ceil(total[0].count / singlePageCoursesLimit));

    }
    useEffect(() => {
       countCourses();
        getCourses();
    }, [user])
    return (
        loading
            ? <>
                <Image src="/loading.gif" alt="loading" width={100} height={100} />
            </> :
            <div className='p-2'>
                <h1 className='text-2xl font-bold'>Others Courses</h1>
                <p className='text-gray-400'>{totalCourses} Courses</p>
                <div className='flex gap-3 flex-wrap justify-evenly my-5'>
                    {
                        courses && courses.length > 0 ? courses.map((course, index) => (
                            <>
                                <CourseCard
                                    key={index}
                                    ImgUrl={course.CoureImage}
                                    CourseName={course.name}
                                    CourseDescription={course.description}
                                    createdBy={course.createdBy}
                                    courseId={course.courseId}
                                    handleDelete={handleDelete}
                                    userEmailAddress={user?.primaryEmailAddress?.emailAddress}
                                    category={course.category}

                                />
                            </>
                        )):
                        <div className='text-center w-full'>
                            <h1 className='text-2xl font-bold'>No Courses Found</h1>
                        </div>
                    }
                </div>
                {/* Pagination */}
                <div className='flex justify-center gap-2  '>
                    <Button
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                                getCourses();
                            }
                        }}
                        className='bg-primary text-white px-4 py-2 rounded-lg'
                    >
                        Previous
                    </Button>
                    <p>
                        {currentPage} of {totalPages}
                    </p>
                    <Button
                        onClick={() => {
                            if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1);
                                getCourses();
                            }
                        }}
                        className='bg-primary text-white px-4 py-2 rounded-lg'
                    >
                        Next
                    </Button>
                    </div>
            </div>
    )
}

export default CourseSection