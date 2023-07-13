import CircleLoader from '@/components/Loader';
import Logo from '@/components/Logo';
import Successful from '@/components/success';
import cogotoast from '@/components/toaster';
import withAuth from '@/services/withAuth';
import { FormInput } from '@/styles/useStyles';
import { getWithExpiry } from '@/utils/req';
import Head from 'next/head';
import { useState } from 'react';
import { logOutAction } from '@/utils/auth';
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { useRouter } from 'next/router';

const ReturningStudent = () => {
  const [success, setSuccess] = useState(false)
  const [policeReport, setPoliceReport] = useState("")
  const [affidavit, setAffidavit] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handlePoliceReport = (event) => {
    setPoliceReport(event.target.files[0]);
  };
  const handleAffidavit = (event) => {
    setAffidavit(event.target.files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (policeReport && affidavit) {
      setIsLoading(true)
      const token = getWithExpiry("jwtToken")
      try {



        const formData = new FormData();
        const headers = new Headers();
        formData.append('affidavit', affidavit);
        formData.append('policereport', policeReport);

        headers.append("Authorization", `Bearer ${token}`)

        const response = await fetch('/api/upload/docs', {
          method: 'POST',
          body: formData,
          headers
        });
        const res = await response.json()
        setIsLoading(false)


        if (response.ok) {
          // setSuccess(true)
          cogotoast("Documents successfully uploaded", "success")
          setAffidavit("")
          setPoliceReport("")
        } else {
          if (res.message === "Unauthenticated") {
            logOutAction()
          }
          else {
            cogotoast("You have already uploaded documents", "error")
          }
        }



      } catch (error) {
        setIsLoading(false)
        // cogotoast(err/)
        cogotoast('Error uploading document, try again', "error");
      }
    }
    else {
      cogotoast("Kindly upload all documents", "error")
    }


  }

  const goBack = () => {
    router.back();
  };
  // const { isSuccess, isLoading, mutate: UploadDetails } = useMutation(

  //   async () => {
  //     const formData = new FormData();
  //     formData.append('policeReport', policeReport);
  //     formData.append('affidavit', affidavit);


  //     return await api.post(uploadDocs, {
  //       formData
  //     })
  //   },
  //   {
  //     onSuccess: (response) => {
  //       const res = response.data

  //       setSuccess(true)

  //     },
  //     onError: (res) => {
  //       const err = res['response'].data;
  //       cogotoast(err?.message || "Something went wrong, please try again.", "error");
  //     }
  //   }
  // );

  return (
    <>
      <Head>
        <title>Studentify</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='h-screen grid place-items-center bg-gray-50'>
        <form onSubmit={handleSubmit} className='bg-white shadow-md max-w-lg w-full px-6 py-6 rounded-lg flex flex-col gap-10'>
          <div onClick={goBack} className='text-lg items-center mb-6 gap-3 hover:text-primary cursor-pointer'>
            <MdOutlineKeyboardBackspace className='text-2xl' /> Back
          </div>

          <div className="justify-center w-full">
            <Logo />
          </div>
          <div className='justify-center flex-col gap-1 mb-10'>
            <h2 className='text-3xl text-center'>Replacement of ID Card</h2>
            <p className='  text-center mx-auto text-lg text-[#475467]'>You are to provide the documents below to be able to receive a new ID</p>
          </div>
          <FormInput>
            <label htmlFor="email">Affidavit <small>(JPG, JPEG, PNG or PDF)</small></label>
            <input onChange={handleAffidavit} type="file" name="matric_no" id='affidavit' accept=".pdf,.jpeg,.jpg,.png" />
          </FormInput>

          <div>
            <FormInput>
              <label htmlFor="">Police report <small>(JPG, JPEG, PNG or PDF)</small></label>
              <input onChange={handlePoliceReport} type="file" name="password" id="password" accept=".pdf,.jpeg,.jpg,.png" />
            </FormInput>
          </div>

          <button className='!w-full mt-6' disabled={isLoading}>
            {
              isLoading ? <CircleLoader /> : "Request new ID"
            }
          </button>
        </form>
      </div>
      {
        success && <Successful msg="Your documents have been submitted for review. You would be notified via your email when your verification is complete" />
      }
    </>
  );
};

export default withAuth(ReturningStudent);