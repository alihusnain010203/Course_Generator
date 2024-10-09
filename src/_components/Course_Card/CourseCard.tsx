import { Button } from '@/components/ui/button'
import { DeleteIcon, ShoppingBasket, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { CustomAlertDialog } from '../AlertDialog/AlertDialog';

interface CourseCardProps {
    ImgUrl: string;
    CourseName: string;
    courseId: string;
    CourseDescription: string;
    handleDelete?: (id: string) => Promise<boolean>;

}

const CourseCard: React.FC<CourseCardProps> = ({
    courseId,

    ImgUrl,
    CourseName,
    handleDelete,
    CourseDescription,
}) => {
    const [deleting, setDeleting] = useState(false)
    return (
        <div className='flex flex-col items-center justify-between p-1 shadow-md w-[300px] h-[350px] rounded-lg relative'>
            <img src={ImgUrl || "/book.png"} alt='course' className='rounded-t-lg w-full' />
            <div className='p-4'>
                <h1 className='text-lg font-semibold'>{CourseName}</h1>
                <p className='text-gray-500 '>
                    {CourseDescription.split(' ').slice(0, 10).join(' ')}...
                </p>
            </div>
            <Button className='bg-primary'>View Course</Button>
            <Trash2
                onClick={async () => {
                    setDeleting(true)
                    if (handleDelete) {
                        const result = await handleDelete(courseId)
                        if (result) {
                            setDeleting(false)
                        }

                    }
                }

                }
                className=' text-red-400 absolute top-1 right-1 cursor-pointer' />
            <CustomAlertDialog
                loading={deleting}
                text='Waiting to delete'
            />
        </div>
    )
}

export default CourseCard