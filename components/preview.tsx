import React, { useEffect, useState } from 'react';
import { Editables } from './edit-info';
import AuthLayout from './NewLayout';
import { IoMdArrowBack } from 'react-icons/io';
import cogotoast from './toaster';
import Successful from './success';

const Preview = (props: any) => {
  const [fileInfo, setFileInfo] = useState<any>()
  const [progressBar, setProgressBar] = useState<any>(0)
  const [success, setSuccess] = useState(false)

  function handleChange(event) {
    console.log(`${event}`);
    console.log(event.target.files[0])
    console.log(event.target.files[0].size)
    console.log(event.target.files[0].type)
    console.log(event.target.files[0].name)
    setFileInfo(event.target.files[0])
  }

  function calculateUploadPercentage(uploadedAmount, totalAmount) {
    console.log("Is running")
    if (uploadedAmount < 0 || totalAmount <= 0) {
      throw new Error('Invalid input. Uploaded amount must be non-negative and total amount must be positive.');
    }

    const percentage = (uploadedAmount / totalAmount) * 100;
    setProgressBar(percentage.toFixed(2)); // Rounds the percentage to two decimal places
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (fileInfo === "") {
      cogotoast("Please select a file first", "error")
    }
    else {
      setSuccess(true)
      setInterval(() => calculateUploadPercentage(0, fileInfo?.size), 1000)
    }
  }
  return (
    <AuthLayout>

      <div className="relative items-center justify-center w-full">
        <div className={`rounded-md bg-white py-8 pb-12 max-w-lg w-full shadow-lg px-4 lg:px-8 selfie-card block show`}>
          <form onSubmit={handleSubmit} className='grid gap-8'>
            <p className='text-primary items-center gap-2 text-lg cursor-pointer' onClick={() => props.previousStep()}>
              <IoMdArrowBack className='text-xl' />
              Back
            </p>
            <div className='justify-center flex-col gap-1'>
              <h2 className='text-3xl text-left'>Upload Signature</h2>
              <p className='  text-left mx-auto text-lg text-[#475467]'>You are to provide the documents below to be able to receive a new ID</p>
            </div>
            <div>
              <i className='text-xs justify-between items-center'>
                <span>Uploading</span>
                <span>{progressBar}%</span>
              </i>
              <div className="drop_box relative">
                <input onChange={handleChange} className='block opacity-0 absolute top-0 right-0 w-full h-full' type="file" hidden accept=".doc,.docx,.pdf" id="fileID" />
                {
                  fileInfo?.['name'] ? <span className='mb-4'>{fileInfo?.['name']}</span> :
                    <>
                      <h4>Select File here</h4>
                      <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
                    </>
                }

                <span className="btn font-semibold">
                  {
                    fileInfo ? 'Change File' : 'Choose File'
                  }
                </span>
              </div>
            </div>
            {/* <Editables editable className='py-6'>
            <label htmlFor="email">Affidavit <small>(SVG, JPG or PNG)</small></label>
            <input type="file" name="matric_no" id="email" placeholder='Enter your Matric No' />
          </Editables> */}

            {/* <div>
            <Editables editable>
              <label htmlFor="">Police report <small>(SVG, JPG or PNG)</small></label>
              <input type="file" name="password" id="password" />
            </Editables>
          </div> */}

            <button className='h-auto py-3'>Request new ID</button>

          </form>
        </div>
      </div>
      {
          success && <Successful />
        }
    </AuthLayout>
  );
};

export default Preview;