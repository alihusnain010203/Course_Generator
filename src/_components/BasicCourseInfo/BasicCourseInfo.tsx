import { Button } from '@/components/ui/button';
import { storage } from '@/lib/firebase/config';
import { FirebaseStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { PuzzleIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'


interface BasicCourseInfoProps {
  name?: string;
  category?: string;
  description?: string;
  UserProfileImage?: string;
  updateCourse?: any
}

const BasicCourseInfo: React.FC<BasicCourseInfoProps> = ({
  name,
  category,
  description,
  UserProfileImage,
  updateCourse
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  // const [file, setFile] = useState<File | null>(null);
  const [showThumnail, setShowThumbnail] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null)

  const [uploadProgress, setUploadProgress] = useState(0);
  const handleUpload = async (file: File) => {

    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Use the 'on' method to track upload progress and handle errors
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Update progress state
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed', error);
      },
      async () => {
        // Get the download URL after the upload is complete
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL)
        const update = updateCourse(downloadURL)
        if (update) {
          setImageUrl(downloadURL);
          setShowThumbnail(true)
        } else {
          setError("Uploading Failed Try Again")
          setUploadProgress(0)

        }

      }
    );
  };
  console.log('Upload is ' + uploadProgress + '% done');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // debugger
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target)
      console.log(e.target.files);

      handleUpload(e.target.files[0]);
    }
  };



  return (

    <div className=' border-gray-200 border-2 rounded-md p-3 '>
      <div className='flex justify-between p-3 gap-10 flex-col-reverse md:flex-row'>
        {/* Name & Description */}
        <div className='flex flex-1 flex-col gap-4'>
          <h1 className='text-2xl font-bold text-black'>{name}</h1>
          <p className='text-lg text-gray-500'>{description}</p>
          <p className='font-extrabold text-base text-primary flex gap-2'><PuzzleIcon /> {category}</p>
          <Button className='mt-5'>Start</Button>
        </div>
        {/* Image */}
        {showThumnail ? <>
          <div className='flex flex-1 justify-center cursor-pointer md:justify-end '  >
            <Image src={imageUrl!} alt='User Profile' className=' rounded-md' width={300} height={300} />
          </div>
        </> : <div className='flex flex-1 justify-center cursor-pointer md:justify-end relative' onClick={() => inputRef.current?.click()}  >
  {/* Container for Image */}
  <div className='relative'>
    <Image src={"/book.png"} width={300} height={300} alt='image' />

    {/* Overlay On Image */}
    <div className={`absolute top-0 left-0 w-full h-full ${uploadProgress <= 0 ? "bg-black bg-opacity-50 " : "bg-white"} rounded-md`}>
      {/* Upload Image Heading In center */}
      <div className='flex justify-center items-center h-full'>
        {uploadProgress <= 0 ? (
          <h1 className='text-2xl text-white'>Upload Course Image</h1>
        ) : (
          <div className='flex flex-col gap-3'>
            <Image src={"/rocket.gif"} alt='Loading' height={75} width={75} />
            <p className='text-primary text-xl'>{uploadProgress}</p>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
        )}
      </div>

      {/* Input File */}
      <input type='file'
        accept='image/*'
        onChange={handleFileChange}
        ref={inputRef} className='hidden'
      />
    </div>
  </div>
</div>}

      </div>
    </div>

  )
}

export default BasicCourseInfo