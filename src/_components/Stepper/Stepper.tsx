"use client"
import React, { useState } from 'react'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { Lightbulb, Codesandbox, SquareMenu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Step1 from './_shared/Step1/Step1'
import Step2 from './_shared/Step2/Step2'
import run from '@/config/AIModel'
import Step3 from './_shared/Step3/Step3'
import { CustomAlertDialog as AlertDialog } from '../AlertDialog/AlertDialog'
import { db } from '@/config/db/db'
import { CourseSchema } from '@/config/db/schemas/CourseSchema'
import { useRouter } from 'next/navigation'
const courseDetail: { [key: string]: string | React.ReactElement }[] = [
    { title: 'Category', description: 'Add course details', icon: <Codesandbox /> },
    { title: 'Topic & Desc', description: 'Add course content', icon: <Lightbulb /> },

    { title: 'Options', description: 'Set course pricing', icon: <SquareMenu /> },
]
const Stepper = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState();
    const router = useRouter();
    let id = uuid4();


    const saveCourseLayoutInDB = async (data: any) => {

        const res = await db.insert(CourseSchema).values({
            //@ts-ignore
            courseId: id,
            name: data["Course_Name"] || data["Course Name"],
            level: data.Level,
            courseOutput: data,
            description: data.Description,
            referencedVideo: data.referencedVideo || selectData.options.referencedVideo.value,
            category: data?.Category || selectData.selectedCategory,
            duration: String(data?.Duration),
            noOfChapters: String(data?.Chapters?.length || 0),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            UserProfileImage: user?.imageUrl

        })
       

    }
    const [selectData, setSelectedData] = useState({
        selectedCategory: '',
        selectedTopic: {
            title: '',
            description: ''
        },
        options: {
            difficultyLevel: {
                value: "Please Select",
                options: ["Please Select", "Biggner", "Advance"]
            },
            duration: 0,
            noOfChapters: 0,
            referencedVideo: {
                value: "Please Select",
                options: [
                    "Please Select",
                    "Yes",
                    "No"
                ]
            }
        }

    })
    return (
        <div className='flex flex-col p-4 gap-6 md:gap-10 w-full  '>
            <h1 className='text-primary font-bold md:font-extrabold text-xl md:text-3xl text-center'>Create Course</h1>
            <div className='flex gap-4 justify-center items-center '>
                {
                    courseDetail.map((course, index) => (
                        <>
                            <div className='flex justify-center items-center' key={index}>
                                <div key={index} className='flex justify-center items-center flex-col gap-2'>
                                    <div className={`${index <= activeTab ? "bg-primary" : "bg-gray-300"} rounded-full p-2 md:p-4`}>
                                        {course.icon}
                                    </div>
                                    <h1 className={`
                                      
                                        text-black
                                          font-normal md:text-lg text-center`}>{course.title}</h1>
                                </div>




                            </div>
                            {index != courseDetail.length - 1 && <div className='flex justify-center items-center w-[20%]'>
                                <div className={`h-1 ${index < activeTab ? "bg-primary" : "bg-gray-400"} w-full`}>  </div>
                            </div>}
                        </>
                    ))
                }
            </div>
            <div className='flex justify-center items-center'>
                {activeTab === 0 && <Step1 selectedData={selectData} setSelectedData={setSelectedData} />}
                {activeTab === 1 && <Step2 selectedData={selectData} setSelectedData={setSelectedData} />}
                {activeTab === 2 && <Step3 selectedData={selectData} setSelectedData={setSelectedData} />}
            </div>
            <div className='flex justify-between items-center'>
                <Button className='bg-white border border-gray-200 text-gray-600'
                    onClick={() => {
                        setActiveTab(prev => prev - 1)
                    }}
                    disabled={
                        activeTab == 0
                    }>Prev</Button>
                {
                    activeTab < courseDetail.length - 1 ?
                        <Button
                            onClick={() => {
                                setActiveTab(prev => prev + 1)
                            }}
                            disabled={activeTab == courseDetail.length - 1 || activeTab === 0 && selectData.selectedCategory === '' || activeTab === 1 && (selectData.selectedTopic.title === '' || selectData.selectedTopic.description === '')}
                        >Next</Button> :
                        <Button
                            onClick={async () => {
                                try {
                                    setLoading(true)
                                    const res = await run({
                                        category: selectData.selectedCategory,
                                        topic: selectData.selectedTopic.title,
                                        description: selectData.selectedTopic.description,
                                        level: selectData.options.difficultyLevel.value,
                                        duration: selectData.options.duration,
                                        noOfChapters: selectData.options.noOfChapters,
                                        referencedVideo: selectData.options.referencedVideo.value


                                    })
                                    const data = res;
                                    setCourse(JSON.parse(data))
                                  
                                    saveCourseLayoutInDB(JSON.parse(data));
                                    setLoading(false)
                                    router.replace("/create-course/" + id)
                                } catch (error) {
                                    setLoading(false)
                                }

                            }}
                            disabled={
                                activeTab === 2 && (selectData.options.difficultyLevel.value === "Please Select" || selectData.options.duration === 0 || selectData.options.noOfChapters === 0 || selectData.options.referencedVideo.value === "Please Select")
                            }

                        >
                            Generate Course
                        </Button>
                }


            </div>
            <AlertDialog loading={loading} text='Wait AI Generating the course' />

        </div>
    )
}

export default Stepper