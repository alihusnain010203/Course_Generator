"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddCourseHeader = () => {
    const { user } = useUser();
    return (
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
            <Link href={"/create-course"}>
            <Button 
            >
                <PlusIcon /> Create AI Course
            </Button>
            </Link>
        </div>
    );
};

export default AddCourseHeader;
