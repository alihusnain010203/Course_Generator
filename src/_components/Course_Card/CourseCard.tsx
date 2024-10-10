import { Button } from '@/components/ui/button'
import { DeleteIcon, ShoppingBasket, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { CustomAlertDialog } from '../AlertDialog/AlertDialog';
import Image from 'next/image';

interface CourseCardProps {
    ImgUrl: string;
    CourseName: string;
    courseId: string;
    CourseDescription: string;
    createdBy: string;
    userEmailAddress?: string;

    handleDelete?: (id: string) => Promise<boolean>;

}

const CourseCard: React.FC<CourseCardProps> = ({
    courseId,
    createdBy,
    ImgUrl,
    CourseName,
    userEmailAddress,
    handleDelete,
    CourseDescription,
}) => {
    const [deleting, setDeleting] = useState(false)
    return (
        <div className='flex flex-col items-center p-1 shadow-lg border border-gray-200 w-[300px] h-[350px] rounded-lg relative py-3'>
            <img src={ImgUrl || "/book.png"} alt='course' className='rounded-t-lg w-full h-[30%]' />
            <div className='p-4 h-[60%]'>
                <h1 className='text-lg font-semibold'>{CourseName}</h1>
                <p className='text-gray-500 '>
                    {CourseDescription.split(' ').slice(0, 10).join(' ')}...
                </p>
            </div>
            <div className='flex justify-between w-full items-center px-2'>
                <p className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'>
                    <p className='text-white'>{
                        createdBy.split("")[0].toUpperCase()

                    }</p>
                </p>

                <Button className='bg-primary'>View Course</Button>
                {
                    userEmailAddress === createdBy && <Trash2
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
                }
            </div>
            <CustomAlertDialog
                loading={deleting}
                text='Waiting to delete'
            />
        </div>
    )
}

export default CourseCard