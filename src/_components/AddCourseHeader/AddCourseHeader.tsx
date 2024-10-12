"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CourseSchema, TransactionSchema } from "@/config/db/schemas/CourseSchema";
import { count, eq } from "drizzle-orm";
import { db } from "@/config/db/db";


const AddCourseHeader = () => {

    const { user } = useUser();
    const router = useRouter();

    const checkUserIsPro = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            try {

                const check = await db.select().from(TransactionSchema).where(
                    eq(TransactionSchema.email, user.primaryEmailAddress.emailAddress)
                );
                if (check.length > 0 && check[0].expiry_date > new Date().toISOString()) {
                    router.push("/create-course")
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
                    }else{
                        router.push("/create-course")
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }

    // useEffect(() => {
    //     checkUserIsPro();
    // }, [user])

    return (
        <>

            <div className="flex justify-between gap-6 items-center">
                {/* Heading */}
                <div>
                    <h1 className="text-2xl font-light  ">
                        Hello '{" "}
                        <span className=" capitalize font-bold text-primary">
                            {" "}
                            {user?.firstName}
                        </span>
                    </h1>
                    <p className="text-gray-500 text-sm font-bold">
                        Create new course with AI, keep learning .
                    </p>
                </div>
                {/* <Link href={}> */}
                <Button
                    onClick={() => {
                        checkUserIsPro();
                    }}
                >
                    <PlusIcon /> Create AI Course
                </Button>
                {/* </Link> */}
            </div>

        </>

    );
};

export default AddCourseHeader;
