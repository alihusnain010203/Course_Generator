import React from 'react'
import { StepProps } from '@/lib/types';
import { Ambulance, Laptop, Pickaxe } from 'lucide-react';
const categoryData: {
    icon: React.ReactNode,
    title: string,
}[] = [
        {
            icon: <Laptop />,
            title: 'Programming'
        }, {
            icon: <Ambulance />,
            title: 'Medical'
        }, {
            icon: <Pickaxe />,
            title: 'Creative'
        }
    ]
const Step1: React.FC<StepProps> = ({ selectedData, setSelectedData }) => {
    return (
        <div className='flex gap-2 flex-wrap justify-center items-center'>
            {
                categoryData.map((category, index) => {
                    return (
                        <div
                            onClick={() => setSelectedData({ ...selectedData, selectedCategory: category.title })}
                            className={`${selectedData.selectedCategory === category.title ? "bg-purple-100 text-primary border border-primary" : "bg-gray-100 border border-black text-black"} rounded-md text-cente w-[250px] h-fit p-10 flex flex-col gap-3  justify-center items-center cursor-pointer`}>
                            {category.icon}
                            <h1 className='text-xl font-bold'>{category.title}</h1>


                        </div>
                    )
                })
            }</div>
    );
};

export default Step1