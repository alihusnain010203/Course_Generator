import Header from '@/_components/DashboardHeader/DashboardHeader'
import Stepper from '@/_components/Stepper/Stepper'
import React from 'react'

const page = () => {
    return (

        <div className='flex flex-col gap-4 justify-center items-center w-full max-h-screen'>
            <div className='flex flex-col gap-4 justify-center items-center max-w-[1280px] w-[100vw]'><Stepper /></div>

        </div>
    )
}

export default page