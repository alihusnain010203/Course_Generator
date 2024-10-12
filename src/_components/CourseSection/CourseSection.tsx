"use client";
import React, { useEffect, useState } from 'react'
import CourseCard from '../Course_Card/CourseCard'
import { db } from '@/config/db/db';
import { CourseSchema } from '@/config/db/schemas/CourseSchema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import Image from 'next/image';
const CourseSection = () => {
    const [courses, setCourses] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const getCourses = async () => {
        if (user && user.primaryEmailAddress) {
            const res = await db.select().from(CourseSchema).where(eq(CourseSchema.createdBy, user.primaryEmailAddress.emailAddress));
            setCourses(res);
    
            setLoading(false);
        }


    }
    const handleDelete = async (id: string) => {
        if (user && user.primaryEmailAddress) {
            await db.delete(CourseSchema).where(and(eq(CourseSchema.courseId, id), eq(CourseSchema.createdBy, user.primaryEmailAddress.emailAddress)));
            getCourses();
        }
        return true
    }
    useEffect(() => {
        getCourses();
    }, [user])
    return (
        loading
            ? <>
                <Image src="/loading.gif" alt="loading" width={100} height={100} />
            </> :
            <div className='p-2'>
                <h1 className='text-2xl font-bold'>Courses</h1>
                <div className='flex gap-3 flex-wrap justify-evenly'>
                    {
                        courses && courses.length > 0 ? courses.map((course, index) => (
                           
                                <CourseCard
                                    key={index}
                                    ImgUrl={course.courseImage}
                                    CourseName={course.name}
                                    CourseDescription={course.description}
                                    createdBy={course.createdBy}
                                    courseId={course.courseId}
                                    handleDelete={handleDelete}
                                    userEmailAddress={user?.primaryEmailAddress?.emailAddress}
                                    category={course.category}
                                    // course={course}
                                />
                              
                        )):
                        <div className='text-center w-full'>
                            <h1 className='text-2xl font-bold'>No Courses Found</h1>
                        </div>
                    }
                </div>
            </div>
    )
}

export default CourseSection