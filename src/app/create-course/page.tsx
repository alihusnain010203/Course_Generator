"use client";
import Header from '@/_components/DashboardHeader/DashboardHeader'
import Stepper from '@/_components/Stepper/Stepper'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { db } from '@/config/db/db';
import { CourseSchema, TransactionSchema } from '@/config/db/schemas/CourseSchema';
import { count, eq } from 'drizzle-orm';
const page = () => {
    const router = useRouter()
    const { user } = useUser();

    const checkUserIsPro = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            try {
                const check = await db.select().from(TransactionSchema).where(
                    eq(TransactionSchema.email, user.primaryEmailAddress.emailAddress)
                );
                if (check.length > 0 && check[0].expiry_date > new Date().toISOString()) {
                    return;
                }
                else {
                    const countDocument = await db.select(
                        { count: count() }
                    ).from(CourseSchema).where(
                        eq(CourseSchema.createdBy, user.primaryEmailAddress.emailAddress)
                    );
                    if (countDocument[0].count >= 5) {
                        router.push("/dashboard/upgrade")
                        return;
                    } else {
                      return;
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }

    useEffect(() => {
        checkUserIsPro()
    }, [user])

    return (

        <div className='flex flex-col gap-4 justify-center items-center w-full max-h-screen'>
            <div className='flex flex-col gap-4 justify-center items-center max-w-[1280px] w-[100vw]'><Stepper /></div>

        </div>
    )
}

export default page