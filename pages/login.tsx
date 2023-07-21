import React, { useState } from 'react'
import Logo from '@/components/Logo';
import cogotoast from '@/components/toaster';
import Head from 'next/head';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'


import { setWithExpiry } from '../utils/req';
import api, { login } from '../services/api'
import CircleLoader from '@/components/Loader';
import { FormInput } from '@/styles/useStyles';





const Login = () => {
  const [fields, setFields] = useState({
    matricNo: '',
    password: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const { isLoading, mutate: LoginUser } = useMutation(
    async () => {
      return await api.post(login, { ...fields, })
    },
    {
      onSuccess: (response) => {
        const res = response.data
        
        const { firstLogin, firstName, access_token } = res.data;
        api.defaults.headers.Authorization = `Bearer ${access_token}`
        // api.defaults.headers.auth_key= `${process.env.API_AUTHORIZATION_KEY}`
        setWithExpiry('jwtToken', access_token, 18000000)
        if(firstLogin) cogotoast(`Welcome ${firstName}, Update your password to continue `, "success");
        else cogotoast(`Welcome back ${firstName}`, "success")
        router.push("/dashboard")
      },
      onError: (res) => {
        const err = res['response'].data;
        setError(true)
        cogotoast(err?.message || "Something went wrong, please try again.", "error");
      }
    }
  );

  
  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setError(false)
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      LoginUser();
    } catch (err) {
      cogotoast(err.message || "Something went wrong, please try again", "error");
    }
  }


  return (
    <>
      <Head>
        <title>Studentify</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='h-screen grid place-items-center bg-gray-50'>
      <img src='/img/patterns/pattern-2.png' className='z-10 object-cover absolute top-0 right-0 h-full w-full' alt="" />

        <form onSubmit={handleSubmit} className='bg-white relative z-50 shadow-md max-w-lg w-full px-6 py-12 rounded-lg flex flex-col gap-8'>
          <div className="justify-center w-full">
            <Logo />
          </div>
          <div className='justify-center flex-col gap-1'>
            <h2 className='text-xl md:text-3xl text-center'>Login to your account</h2>
            <p className='  text-center mx-auto text-sm md:text-lg text-[#475467]'>Using your valid school credentials, login to the platform.</p>
          </div>
          <FormInput>
            <label htmlFor="matricNo">Matric No.</label>
            <input type="number" name="matricNo" id="matricNo" placeholder='Enter your Matric No'
            className={error ? "!border-red-600" : undefined}
              onChange={handleChange} />
              
            <small className=' block text-red-600 font-semibold'>{error && "Your Matric No/Password doesn't match. Please try again."}</small>
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
            <small className='mt-2 block'><b>Note:</b> Your default password is your surname in lowercase</small>

          </FormInput>
          <button className='!w-full mt-6' disabled={isLoading}>
            {
              isLoading ? <CircleLoader /> : "Submit"
            }
          </button>


        </form>
      </div>
    </>
  );
};



export default Login;