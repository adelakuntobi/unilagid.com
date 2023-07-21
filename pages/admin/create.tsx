import React, { useState } from 'react'
import Logo from '@/components/Logo';
import cogotoast from '@/components/toaster';
import Head from 'next/head';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { faculties } from '@/utils/data';
import CircleLoader from '@/components/Loader';
import { FormInput } from '@/styles/useStyles';
import api, { adminCreate, adminLogin, login } from '@/services/api';
import { setWithExpiry } from '@/utils/req';





const Login = () => {
  const [fields, setFields] = useState({
    faculty: '',
    password: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const [faculty, setFaculty] = useState([])

  const { isLoading, mutate: LoginAdmin } = useMutation(
    async () => {
      return await api.post(adminCreate, { ...fields, })
    },
    {
      onSuccess: (response) => {
        const res = response.data
        const { firstName, lastName, staffID, access_token } = res.data;
        setWithExpiry('jwtToken', access_token, 18000000)
        api.defaults.headers.Authorization = `Bearer ${access_token}`
        sessionStorage.setItem("admin_name", firstName + " " + lastName)
        sessionStorage.setItem("admin_id", staffID)
         cogotoast(`Welcome back`, "success")
        router.push("/admin")
      },
      onError: (res) => {
        const err = res['response'].data;
        setError(true)
        cogotoast(err?.message || "Something went wrong, please try again.", "error");
      }
    }
  );


  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    setError(false)

    if (name === "faculty"){
      setFaculty(faculties[`${value}`])
    }
      setFields({
        ...fields,
        [name]: value,
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      LoginAdmin();
    } catch (err) {
      cogotoast(err.message || "Something went wrong, please try again", "error");
    }
  }


  return (
    <>
      <Head>
        <title>Studentify</title>
        <link rel="shortcut icon" href="/img/logo.svg" type="image/x-icon" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='h-screen flex overflow-hidden'>
      <div className='bg-[#f5f6fa] relative ml-8 my-auto w-3/5 rounded-2xl'
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className=' bg-yellow-700 h-full w-full opacity-20 rounded-2xl absolute top-0 right-0 z-40'></div>
          <img src="/img/create.jpg" className='w-full h-full rounded-2xl object-cover' alt="" />
        </div>
        <div className='w-2/5 mx-auto overflow-y-scroll h-full' >
          <form onSubmit={handleSubmit} className='bg-white relative z-50 mx-auto max-w-md w-full px-6 py-12 rounded-lg flex flex-col gap-8 '>
            <div className="justify-center w-full">
              <Logo />
            </div>
            <div className=' flex-col gap-1'>
              <h2 className='text-2xl'>Create your Staff account</h2>
              <p className='mx-auto  text-[#475467]'>Fill in your credentials to continue.</p>
            </div>
            <FormInput>
              <label htmlFor="firstName">First Name</label>
              <input required type="text" name="firstName" placeholder='Adewale'
                className={error ? "!border-red-600" : undefined}
                onChange={handleChange} />
            </FormInput>
            <FormInput>
              <label htmlFor="lastName">Last Name</label>
              <input required type="text" name="lastName" placeholder='Ibukun'
                className={error ? "!border-red-600" : undefined}
                onChange={handleChange} />
            </FormInput>
            <FormInput>
              <label htmlFor="staffID">Staff ID</label>
              <input required type="text" name="staffID" placeholder='UI/6732/672727'
                className={error ? "!border-red-600" : undefined}
                onChange={handleChange} />
            </FormInput>
            <FormInput>
              <label htmlFor="email">Email</label>
              <input required type="email" name="email" placeholder='adminuser@unilagid.com'
                className={error ? "!border-red-600" : undefined}
                onChange={handleChange} />
            </FormInput>
            <FormInput>
                <label htmlFor="faculty">Faculty</label>
                <select required name="faculty" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="arts">Arts</option>
                  <option value="education">Education</option>
                  <option value="science">Sciences</option>
                  <option value="law">Law</option>
                  <option value="management_sciences">Management Sciences</option>
                  <option value="social_sciences">Social Sciences</option>
                  <option value="engineering">Engineering</option>
                  <option value="environmental_science">Environmental Sciences</option>
                </select>
              </FormInput>
              <FormInput>
                <label htmlFor="department">Department</label>
                <select required name="department" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  {
                    faculty.map((dept, key) => {
                      return (
                        <option key={key} value={dept}>{dept}</option>
                      )
                    })
                  }
                </select>
              </FormInput>
            <FormInput className="">
              <label className="text-[#344054] font-medium ">Password</label>
              <div className={`${error ? "!border-red-600" : "!border-[#D0D5DD]"} input-div  border rounded-md !px-2 flex items-center gap-3 focus-within:!border-primary`}
              >
                <input required name="password" placeholder="***************************"
                  type={isOpen ? "text" : "password"}
                  className="!px-2"
                  onChange={handleChange}
                  value={fields.password}
                  autoComplete='on'
                />
                <div onClick={() => setIsOpen(e => !e)} className="cursor-pointer text-xl text-gray-500">
                  {
                    isOpen ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                </div>
              </div>
              <small className='mt-2 block text-right'><b className='hover:text-primary cursor-pointer'>Forgot password?</b></small>

            </FormInput>
            <button className='!w-full mt-6' disabled={isLoading}>
              {
                isLoading ? <CircleLoader /> : "Submit"
              }
            </button>


          </form>
        </div>
        
      </div>
    </>
  );
};



export default Login;