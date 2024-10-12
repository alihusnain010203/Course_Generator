import React, { useEffect } from 'react'
import { AccordionDemo } from '../ChapterAcordian/ChapterAccordian'
import { db } from '@/config/db/db'
import { CourseSchema } from '@/config/db/schemas/CourseSchema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'

const ViewPageChapters = ({ id }: {
    id: string
}) => {
    const [chapters, setChapters] = React.useState<any[] | null>(null);
    const [loading, setLoading] = React.useState(true);


    const getChapters = async () => {
        // setLoading(true)
        const data = await db.select().from(CourseSchema).where(eq(CourseSchema.courseId, id));
       
       setChapters( JSON.parse(data[0].Chapters))
        setLoading(false)
    }

    useEffect(() => {
        getChapters();

    }, [])

    return (
        // <div>ViewPageChapters</div>
        <>
            {
                loading ? <div className='flex justify-center'>
                    <Image src="/loading.gif" alt="loading" width={100} height={100} />
                </div> : <div className='flex flex-col gap-3'>
                    {
                        chapters?.map((chapter: any, index: number) => (
                            <AccordionDemo key={index} chapter={chapter} />
                        ))

                    }
                </div>
            }

        </>
    )
}

export default ViewPageChapters