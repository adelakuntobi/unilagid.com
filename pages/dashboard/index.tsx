import FullPageLoader from '@/components/FullpageLoader';
import Guidelines from '@/components/Guidelines';
import Layout from '@/components/Layout';
import api, { overview, updatePassword } from '@/services/api';
import { FormInput, Modalstyle } from '@/styles/useStyles';
import { NEW_STUDENT, RETURNING_STUDENT } from '@/utils/pageUrl';
import { guidelines2, guidelinesArr } from '@/utils/reuseables';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import CircleLoader from '@/components/Loader';
import cogotoast from '@/components/toaster';
import withAuth from '@/services/withAuth';
import { useRouter } from "next/router"
import { logOutAction } from '@/utils/auth';
import IdCard from './idcard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Successful from '@/components/success';
import IsError from '@/components/error';

export const getOverview = async () => {
  const response = await api.get(overview);
  return response
}

export function convertString(input) {
  return input.replace('_', ' ');
}
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [missingRequirements, setMissingRequirements] = useState([]);
  const [fields, setFields] = useState({
    password: '',
    confirmPassword: ''
  })

  const router = useRouter()
  const { data: overviewRes, error, isSuccess: isSuccessful, isLoading } = useQuery('overviewData', getOverview, {
    staleTime: Infinity,
    refetchOnWindowFocus: 'always'
  });

  useEffect(() => {
    console.log(error, overviewRes)
    if (error) {
      if (error['response'].data.message === "Unauthenticated") {
        logOutAction()
        cogotoast("Please login to continue", "error");
        router.push('/login')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const user = overviewRes?.data?.data

  function validatePassword(password) {
    // Define the regular expressions for each password requirement
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;
    const minLength = 8;

    // Store the missing requirements
    const missingRequirements = [];

    // Check each requirement and add the missing ones to the array
    if (!uppercasePattern.test(password)) {
      missingRequirements.push('uppercase');
    }
    if (!lowercasePattern.test(password)) {
      missingRequirements.push('lowercase');
    }
    if (!digitPattern.test(password)) {
      missingRequirements.push('digit');
    }
    if (password.length < minLength) {
      missingRequirements.push(`at least ${minLength} characters`);
    }

    // Return the array of missing requirements
    return missingRequirements;
  }


  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const newPassword = event.target.value;
    const requirements = validatePassword(newPassword);
    setMissingRequirements(requirements);
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (fields?.password === fields?.confirmPassword) UpdatePassword();
      else cogotoast("Password and confirm password does not match", "error")
    } catch (err) {
      cogotoast(err.message || "Something went wrong, please try again", "error");
    }
  }

  const { isLoading: isChangeLoading, mutate: UpdatePassword } = useMutation(
    async () => {
      return await api.put(updatePassword, { ...fields })
    },
    {
      onSuccess: (response) => {
        const res = response.data
        cogotoast(response.data.message, response.data.status);
        location.reload()
      },
      onError: (res) => {
        const err = res['response'].data;
        cogotoast(err?.message || "Something went wrong, please try again.", "error");
      }
    }
  );
  const baseUrl = process.env.IMAGE_URL
  const handlePrint = () => {

    html2canvas(document.querySelector("#capture"), { scale: 15 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 204, 322);
      pdf.save("StudentCopyIDcard" + user?.lastName + " " + user?.firstName+".pdf");
    });

  }
  if (isLoading) return <FullPageLoader />
  return (
    <Layout>
      {
        user?.firstLogin &&
        <Modalstyle>

          <div className=" max-w-lg bg-white w-full text-black p-6 rounded-lg">
            <form onSubmit={changePassword} className='w-full flex flex-col gap-8'>
              <div className='justify-center flex-col gap-1'>
                <h2 className='text-2xl mb-4 text-center'>Change your password </h2>
              </div>
              <FormInput>
                <label htmlFor="email">New password</label>
                <div className={`${missingRequirements.length > 0 ? "!border-red-600" : "!border-[#D0D5DD]"} input-div  border rounded-md !px-2 flex items-center gap-3 focus-within:!border-primary`}
                >
                  <input required name="password" placeholder="************"
                    type={isOpen ? "text" : "password"}
                    className="!px-2"
                    onChange={handleChange}
                    value={fields['password']}
                    autoComplete='off'
                  />
                  <div onClick={() => setIsOpen(e => !e)} className="cursor-pointer text-xl text-gray-500">
                    {
                      isOpen ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                  </div>
                </div>
                {missingRequirements.length > 0 && (
                  <small className='text-red-500 block font-semibold'>Your password must contain {missingRequirements.join(', ')}</small>
                )}

              </FormInput>

              <FormInput className="">
                <label className="text-[#344054] font-medium ">Confirm Password</label>
                <div className={`${error ? "!border-red-600" : "!border-[#D0D5DD]"} input-div  border rounded-md !px-2 flex items-center gap-3 focus-within:!border-primary`}
                >
                  <input required name="confirmPassword" placeholder="************"
                    type={isConfirmOpen ? "text" : "password"}
                    className="!px-2"
                    onChange={handleChange}
                    value={fields['confirmPassword']}
                    autoComplete='off'
                  />
                  <div onClick={() => setIsConfirmOpen(e => !e)} className="cursor-pointer text-xl text-gray-500">
                    {
                      isConfirmOpen ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                  </div>
                </div>
                {/* <small className='text-red-500 block font-semibold'>{error && "Your Matric No/Password doesn't match. Please try again."}</small> */}

              </FormInput>
              <button className='!w-full mt-4' disabled={isChangeLoading}>
                {
                  isChangeLoading ? <CircleLoader /> : "Submit"
                }
              </button>
            </form>
          </div>
        </Modalstyle>
      }
      <IdCard />
      {/* <IsError /> */}

      {/* <section>
        <div className='bg-[#219653] text-white  px-10 py-12  relative overflow-hidden'>
          <img src="/img/dashboard-pattern.svg" className='absolute object-cover top-0 left-0 bottom-0 z-0 w-full h-full' alt="" />
          <div className='max-w-7xl mx-auto flex-col md:flex-row items-center justify-between'>
            <div className=''>
              <h4 className='text-2xl font-semibold'>Welcome,<span className='text-3xl'> Oguntunde Victor</span></h4>
              <p className='font-semibold text-lg'>Programme : Bachelor of Science in Electrical and Electronics Engineering</p>
            </div>
            <img className='relative z-10' src="/img/dashboard-header.svg" alt="" />
          </div>
        </div>
      </section> */}

      <section className='bg-gray-50 py-28'>
        <div className='max-w-7xl mx-auto items-center gap-10'>

          <img src={baseUrl + user?.matricNo} className=' w-56 h-64 rounded-md shadow' alt="" />
          <div className='flex flex-col gap-4 justify-start items-start'>
            {
              user?.newStudent ? <span className='bg-[#219653] text-white text-xs rounded-sm px-2 py-1 font-bold'>Fresh Student</span> :
                <span className='bg-[#ffbe00] text-xs rounded-sm px-2 py-1 font-bold'>Returning Student</span>}
            <div>
              <h1 className='text-5xl font-bold'> <span className='uppercase'>{user?.lastName},</span> {user?.firstName} {user?.otherNames}</h1>
              <h2 className='text-2xl font-bold'>{user?.matricNo}</h2>
            </div>
            <div className='flex flex-wrap gap-x-8 gap-y-1.5 max-w-xl'>
              <HeaderProfile>
                <label>Faculty:</label>
                <p>{convertString(user?.faculty)}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Department:</label>
                <p>{user?.department}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Gender:</label>
                <p>{user?.gender}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Hostel:</label>
                <p>{user?.hostel} Hall</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Year of Admission:</label>
                <p>{user?.yearOfAdmission}</p>
              </HeaderProfile>
            </div>
            {
              !user?.newStudent &&
              <button onClick={handlePrint} className=' px-6 py-2.5 rounded-full text-sm h-auto mt-2'>
                Download Virtual Card
              </button>
            }
          </div>

        </div>
      </section>
      <section className='max-w-7xl mx-auto px-4'>
        <div className='mt-8 max-w-5xl'>
          <h4 className='font-bold text-2xl mb-2'>Photo Requirements for Unilag Identity Cards</h4>
          <p className='text-[#495057]'>Photos used for ID cards must meet certain requirements. These include requirements concerning dimensions, photo quality, background, appearance, position, facial expression, glasses, lighting and framing.</p>
        </div>

        <div className='my-6'>
          <h4 className='text-lg font-bold '>Dimensions</h4>
          <div className='grid gap-6 grid-cols-1 lg:grid-cols-2 '>
            <div>
              {
                guidelinesArr.map((guideline, index) => (
                  <Guidelines key={index} guideline={guideline} />
                ))
              }
            </div>
            <div>

              {
                guidelines2.map((guideline, index) => (
                  <Guidelines key={index} guideline={guideline} />
                ))
              }
            </div>
          </div>
          {/* {
          } */}
          <Link href={
            user?.newStudent ? NEW_STUDENT : RETURNING_STUDENT
          }>
            <button className='px-12 mt-8'>Continue</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};


const HeaderProfile = styled.div`
display: flex;
align-items: center;
/* font-size: 14px; */
gap: 5px;
font-weight: 500;
label{
  /* font-weight: 700; */
  color: #908f8f;
}
p{
  text-transform: capitalize;
    font-weight: 600;
    color  : #3d3f45;
    }
`

export default withAuth(Dashboard);