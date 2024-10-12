"use client"
import React, { useEffect, useState } from 'react'
import { CircleDollarSign, HomeIcon, Expand } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { db } from '@/config/db/db';
import { TransactionSchema } from '@/config/db/schemas/CourseSchema';
import { eq } from 'drizzle-orm';
const Links: { icon: React.ReactElement;  path: string }[] = [
    {
        icon: <HomeIcon />,
        path: '/dashboard',
    },
    {
        icon: <Expand />,
        path: '/dashboard/explore',
    },
    {
        icon: <CircleDollarSign />,
        path: '/dashboard/upgrade',
    },
];

const DownNavigation = () => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/dashboard")
    const [isPro, setIsPro] = useState(false);
    const { user } = useUser();

    const checkUserIsPro = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            try {

                const check = await db.select().from(TransactionSchema).where(
                    eq(TransactionSchema.email, user.primaryEmailAddress.emailAddress)
                );
               
                if (check.length > 0 && check[0].expiry_date > new Date().toISOString()) {
                    setIsPro(true);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }

    useEffect(() => {

        setActiveTab(pathname)

    }, [pathname])
    useEffect(() => {
        checkUserIsPro();
    }, [user])
    return (
        <div className='w-full flex justify-center items-center '>
            <div className='w-[300px] h-[50px] rounded-lg bg-primary flex items-center justify-evenly'>
                {
                    Links.map((link, index) => {
                        // If the user is Pro, skip the last item (Upgrade)
                        if (isPro && link.path === '/dashboard/upgrade') {
                            return null;
                        }

                        return (
                            <Link href={link.path} key={+link + index}>
                                <div key={index} className={`flex items-center gap-4 p-2 ${activeTab === link?.path ? "bg-gray-300 text-primary" : "bg-white text-gray-500"} rounded-md hover:bg-gray-100`}>
                                    {link.icon}
                                </div>
                            </Link>
                        );
                    })
                }
            </div>

        </div>
    )
}

export default DownNavigation



{/* <div className='flex flex-col justify-between'>
<div className='flex flex-col gap-4'>

    {Links.map((link, index) => {
        // If the user is Pro, skip the last item (Upgrade)
        if (isPro && link.path === '/dashboard/upgrade') {
            return null;
        }

        return (
            <Link href={link.path} key={+link + index}>
                <div key={index} className={`flex items-center gap-4 p-2 ${activeTab === link?.path ? "bg-gray-300 text-primary" : "bg-white text-gray-500"} rounded-md hover:bg-gray-100`}>
                    {link.icon}
                </div>
            </Link>
        );
    })}
    {/* DownNavigation Footer */}

// </div>
// <div className='absolute left-0 bottom-0 p-4 flex gap-1 flex-col'>
//     {/* <Progress className='text-primary' value={20} /> */}
//     {isPro ?
//     <>
//         <p className=' font-medium text-gray-500'>
//        You are Pro User 🔥
//     </p>
//         <p className='text-xs font-bold text-primary'>Unlimited Genration</p></>
//         : <><p className=' font-medium text-gray-500'>
//             Only 5 for free
//         </p>
//             <Link href={"/dashboard/upgrade"}>
//                 <p className='text-xs font-bold text-primary' >Upgrade For Unlimited Genration</p></Link></>}
// </div>
// </div> */}