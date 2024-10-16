
import Header from '@/_components/DashboardHeader/DashboardHeader'
import DownNavigation from '@/_components/DownNaviagtion/DownNavigation'
import Sidebar from '@/_components/Sidebar/Sidebar'

import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full flex '>
            {/* Sidebar */}
            <div className='hidden md:block w-[15%] lg:w-[280px] shadow-md h-screen sticky top-0 left-0 '>
                <Sidebar />
            </div>
            {/* Bottom Navigation */}
            <div className='flex justify-center items-center w-full z-10 md:hidden fixed bottom-1 bg-white '>
                <DownNavigation/>
            </div>
            <div className='flex flex-col w-full'>
                <Header />
                <div className='p-6'>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default DashboardLayout