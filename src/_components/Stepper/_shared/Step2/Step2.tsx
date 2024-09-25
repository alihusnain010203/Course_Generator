import React, { ChangeEvent } from 'react';
import { StepProps } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export interface InputBoxProps {
    label: string;
    value: string|number;
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Step2: React.FC<StepProps> = ({ selectedData, setSelectedData }) => {
    return (
        <div className='flex flex-col gap-3 w-[60%]'>
            <InputBox
                label='💡Write Topic in which you interested'
                placeholder="Enter Topic"
                value={selectedData.selectedTopic.title}
                onChange={(e) => setSelectedData({
                    ...selectedData,
                    selectedTopic: {
                        ...selectedData.selectedTopic,
                        title: e.target.value
                    }
                })}
            />
            <InputBox
                label='📝Enter more details about the topic'
                
                placeholder='Description'
                value={selectedData.selectedTopic.description}
                onChange={(e) => setSelectedData({
                    ...selectedData,
                    selectedTopic: {
                        ...selectedData.selectedTopic,
                        description: e.target.value
                    }
                })}
            />
        </div>
    );
};

const InputBox: React.FC<InputBoxProps> = ({ label, value, onChange,placeholder }) => {
    return (

        <div className="grid w-full items-center gap-1.5">
            <Label className='text-lg font-normal' htmlFor={label}>{label}</Label>
            {
                label === '💡Write Topic in which you interested' ? <Input type="text" id={label} value={value} onChange={onChange} placeholder={placeholder} /> : <Textarea id={label} placeholder={placeholder} value={value} onChange={onChange} />
            }

        </div>

    );
};

export default Step2;
