import React, { useState } from 'react'
import Logo from '@/components/Logo';
import cogotoast from '@/components/toaster';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'


import { setWithExpiry } from '../utils/req';
import api, { login } from '../services/api'
import CircleLoader from '@/components/Loader';





const Login = () => {
  const [fields, setFields] = useState({
    matricNo: '',
    password: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const { isLoading, mutate: LoginUser } = useMutation(
    async () => {
      return await api.post(login, { ...fields, })
    },
    {
      onSuccess: (response) => {
        const res = response.data
        router.push("/dashboard")

        const { access_token } = res.data;
        api.defaults.headers.Authorization = `Bearer ${access_token}`
        // api.defaults.headers.auth_key= `${process.env.API_AUTHORIZATION_KEY}`
        setWithExpiry('jwtToken', access_token, 18000000)
        cogotoast("Welcome back Superadmin ", "success");
      },
      onError: (res) => {
        // const err = res?.response?.data;
        // cogotoast(err.message || "Something went wrong, please try again.", "error");
      }
    }
  );

  
  const handleChange = (event: { target: { name: any; value: any; }; }) => {
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
        <form onSubmit={handleSubmit} className='bg-white shadow-md max-w-lg w-full px-6 py-12 rounded-lg flex flex-col gap-8'>
          <div className="justify-center w-full">
            <Logo />
          </div>
          <div className='justify-center flex-col gap-1'>
            <h2 className='text-3xl text-center'>Login to your account</h2>
            <p className='  text-center mx-auto text-lg text-[#475467]'>Using your valid school credentials, login to the platform.</p>
          </div>
          <FormInput>
            <label htmlFor="email">Matric No.</label>
            <input type="number" name="matricNo" id="matricNo" placeholder='Enter your Matric No'
              onChange={handleChange} />
          </FormInput>

          <FormInput className="">
            <label className="text-[#344054] font-medium ">Password</label>
            <div className="input-div !border-[#D0D5DD] border rounded-md !px-2 flex items-center gap-3 focus-within:!border-primary"
              style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}>
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



export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 2rem ; */
  width: 100%;
  label{
    margin-bottom: 0.5rem;  
    font-size: 0.85rem;
    line-height: 1;
    letter-spacing: 0.02em;
    font-weight: 500;
    opacity: 0.7;
  }
  input,select,.input-div,.PhoneInput{
    padding: 0.65rem 1rem;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    width: 100%;
    background: transparent;
    outline: 0;
    input{
      padding: 0;
      border: 0;
    }

    .input-div,textarea{
      &:focus,&:focus-within{
        box-shadow: let(0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 #0000), let(--tw-ring-shadow, 0 0 #0000), let(--tw-shadow);
      }
    }
    &:focus,&:focus-within{
      box-shadow: let(0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 #0000), let(--tw-ring-shadow, 0 0 #0000), let(--tw-shadow);
    }


    @media (max-width: 768px) { 
      padding: 0.65rem 0.5rem;
    }	
  }
`;
export default Login;