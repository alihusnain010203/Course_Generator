"use client"
import React, { useEffect, useState } from 'react'
import { CircleDollarSign, HomeIcon, Expand } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
const Links: { icon: React.ReactElement; heading: string; path: string }[] = [
    {
        icon: <HomeIcon />,
        heading: 'Home',
        path: '/dashboard',
    },
    {
        icon: <Expand />,
        heading: 'Explore',
        path: '/dashboard/explore',
    },
    {
        icon: <CircleDollarSign />,
        heading: 'Upgrade',
        path: '/dashboard/upgrade',
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/dashboard")
    console.log(pathname)
    useEffect(() => {
        setActiveTab(pathname)

    }, [pathname])
    return (
        <div className='flex flex-col p-3 gap-2'>
            <Image alt='logo' src="/logo.jpg" width={150} height={150} className='text-center' />
            <div className='flex flex-col justify-between'>
                <div className='flex flex-col gap-4'>

                    {Links.map((link, index) => (
                        <Link href={link.path}>
                            <div key={index} className={`flex items-center gap-4 p-2 ${activeTab === link?.path ? "bg-gray-300 text-primary" : "bg-white text-gray-500"} rounded-md hover:bg-gray-100`}>
                                {link.icon}
                                <span>{link.heading}</span>
                            </div></Link>
                    ))}
                    {/* SideBar Footer */}

                </div>
                 <div className='absolute left-0 bottom-0 p-4 flex gap-1 flex-col'>
                    <Progress className='text-primary' value={20} />
                    <p className=' font-medium text-gray-500'>Course 5 out of 5</p>
                    <p className='text-xs font-bold text-primary'>Upgrade For Unlimited Genration</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar