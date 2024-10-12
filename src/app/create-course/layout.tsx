
import Header from '@/_components/DashboardHeader/DashboardHeader'
import React from 'react'

const CreateCourseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div >
            <Header />
            {children}
        </div>
    )
}

export default CreateCourseLayout