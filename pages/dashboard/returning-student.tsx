import Logo from '@/components/Logo';
import Successful from '@/components/success';
import withAuth from '@/services/withAuth';
import { FormInput } from '@/styles/useStyles';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';


const ReturningStudent = () => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(true)
  }



  return (
    <>
      <Head>
        <title>Studentify</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='h-screen grid place-items-center bg-gray-50'>
        <form onSubmit={handleSubmit} className='bg-white shadow-md max-w-lg w-full px-6 py-12 rounded-lg flex flex-col gap-10'>
          <div className="justify-center w-full">
            <Logo />
          </div>
          <div className='justify-center flex-col gap-1 mb-10'>
            <h2 className='text-3xl text-center'>Replacement of ID Card</h2>
            <p className='  text-center mx-auto text-lg text-[#475467]'>You are to provide the documents below to be able to receive a new ID</p>
          </div>
          <FormInput>
            <label htmlFor="email">Affidavit <small>(SVG, JPG or PNG)</small></label>
            <input type="file" name="matric_no" id="email" placeholder='Enter your Matric No' />
          </FormInput>

          <div>
            <FormInput>
              <label htmlFor="">Police report <small>(SVG, JPG or PNG)</small></label>
              <input type="file" name="password" id="password" />
            </FormInput>
          </div>

          <button className='h-auto py-3'>Request new ID</button>

        </form>
      </div>
      {
        success && <Successful />
      }
    </>
  );
};

export default withAuth(ReturningStudent);