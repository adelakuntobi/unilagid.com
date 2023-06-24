import React, { useEffect, useRef, useState } from 'react';
import { Editables } from './edit-info';
import AuthLayout from './NewLayout';
import { IoMdArrowBack } from 'react-icons/io';
import cogotoast from './toaster';
import Successful from './success';
import SignatureCanvas from 'react-signature-canvas'
import { TbSignature } from "react-icons/tb"

const Preview = (props: any) => {
  const [fileInfo, setFileInfo] = useState<any>()
  const [progressBar, setProgressBar] = useState<any>(0)
  const [success, setSuccess] = useState(false)
  const [signature, setSignature] = useState(null)
  const [removePLH, setRemovePLH] = useState(false)
  const signRef = useRef<any>();
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

  const handleSignatureEnd = () => {
    setSignature(signRef.current?.toDataURL());
  }
  const clearSignature = () => {
    signRef?.current?.clear();
    setSignature(null);
  }
  const isEmptyFunction = () => {
    console.log(signRef?.current?.isEmpty());
    // setSignature(null);
  }


  useEffect(() => {
    isEmptyFunction()
    console.log(signature);
  }, [signature]);

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
              <h2 className='text-3xl text-left '>Upload Signature</h2>
              <p className='  text-left mx-auto text-lg text-[#475467]'>You are to provide the documents below to be able to receive a new ID</p>
            </div>
            <div>
              <div className='relative'>
                {
                  !removePLH &&
                  <div onTouchStart={() => setRemovePLH(true)}
                  onMouseEnter={() => setRemovePLH(true)} 
                  onMouseLeave={() => (signature ?  setRemovePLH(false) : setRemovePLH(true))}
                   className='absolute m-auto left-0 right-0 -top-2 bottom-0  items-center justify-center flex-col'>
                    <TbSignature className='text-5xl text-gray-300' />
                    <label className='text-3xl uppercase font-semibold text-gray-200'>Sign here</label>
                  </div>
                }

                <SignatureCanvas
                  ref={signRef}
                  penColor='black'
                  // minWidth={2}
                  // maxWidth={5}
                  // dotSize={10}
                  throttle={0}
                  minDistance={0}
                  canvasProps={{ height:500, className: 'rounded-lg border-4 border-dotted w-full bg-transparent' }}
                  onEnd={handleSignatureEnd}
                />
              </div>
              <p className='text-sm text-right mt-2'>Unable to sign? <a className='text-primary' href="http://tobi">Try uploading </a></p>
            </div>

            <div>
              <button type='button' onClick={clearSignature}>Clear</button>
            </div>

            {/* <div>
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
            </div> */}
            <button className='h-auto py-3'>Request new ID</button>

          </form>
        </div>
      </div >
      {
        success && <Successful />
      }
    </AuthLayout >
  );
};

export default Preview;