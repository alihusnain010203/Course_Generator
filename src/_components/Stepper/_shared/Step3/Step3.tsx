import React from 'react';
import { StepProps } from '@/lib/types';
import { InputBoxProps } from '../Step2/Step2';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Step3: React.FC<StepProps> = ({ selectedData, setSelectedData }) => {
    return (
        <div className='w-full flex justify-center items-center flex-col gap-4'>
            <div className="flex w-[60%] flex-wrap justify-between items-center">
                <SelectComponent
                    label={"🎓 Difficulty Level"}
                    options={selectedData.options.difficultyLevel.options}
                    selectedValue={selectedData.options.difficultyLevel.value}
                    onChange={(value: string) => {
                        setSelectedData({
                            ...selectedData,
                            options: {
                                ...selectedData.options,
                                difficultyLevel: {
                                    ...selectedData.options.difficultyLevel,
                                    value: value
                                }
                            }
                        });
                    }}
                />
                <SelectComponent
                    label={"📹 Want Refernce Videos"}
                    options={selectedData.options.referencedVideo.options}
                    selectedValue={selectedData.options.referencedVideo.value}
                    onChange={(value: string) => {
                        setSelectedData({
                            ...selectedData,
                            options: {
                                ...selectedData.options,
                                referencedVideo: {
                                    ...selectedData.options.referencedVideo,
                                    value: value
                                }
                            }
                        });
                    }}
                />
            </div>
            <div className="flex w-[60%] flex-wrap justify-between items-center">
                <InputBox placeholder='No of Hours' value={selectedData.options.duration} label={"⏲️ Duration (In Hours)"}
                    onChange={(e) => setSelectedData({
                        ...selectedData,
                        options: {
                            ...selectedData.options,
                            duration: Number(e.target.value)
                        }
                    })} />
                <InputBox placeholder='No of Chapters' value={selectedData.options.noOfChapters} label={"📕 Chapters"}
                    onChange={(e) => setSelectedData({
                        ...selectedData,
                        options: {
                            ...selectedData.options,
                            noOfChapters: Number(e.target.value)
                        }
                    })} />
            </div>
        </div>
    );
};

export default Step3;

interface SelectComponentProps {
    label: string;
    options: string[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ label, options, selectedValue, onChange }) => {
    return (
        <div>
            <label htmlFor="select" className="block text-lg font-normal">
                {label}
            </label>
            <div className='mt-1.5 w-[196px] md:w-[196px] rounded-lg border border-gray-300'>
                <select
                    name="select"
                    id="select"
                    value={selectedValue}
                    onChange={(e) => onChange(e.target.value)} // Trigger onChange with the selected value
                    className="mt-1.5 w-full rounded-lg outline-none border-gray-800 text-gray-700 sm:text-sm"
                >
                    {options.map((option, index) => (
                        <option key={option + index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};



const InputBox: React.FC<InputBoxProps> = ({ label, value, onChange, placeholder }) => {
    return (

        <div className="grid items-center gap-1.5">
            <Label className='text-lg font-normal' htmlFor={label}>{label}</Label>
            <Input type="text" id={label} value={value} onChange={onChange} placeholder={placeholder} />

        </div>

    );
};
