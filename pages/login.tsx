import Logo from '@/components/Logo';
import Head from 'next/head';
import styled from 'styled-components';

const Login = () => {
  return (
    <>
      <Head>
        <title>Studentify</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='h-screen grid place-items-center bg-gray-50'>
        <form action="" className='bg-white shadow-md max-w-lg w-full px-6 py-12 rounded-lg flex flex-col gap-8'>
          <div className="justify-center w-full">
            <Logo />
          </div>
          <div className='justify-center flex-col gap-1'>
            <h2 className='text-3xl text-center'>Login to your account</h2>
            <p className='  text-center mx-auto text-lg text-[#475467]'>Using your valid school credentials, login to the platform.</p>
          </div>
          <FormInput>
            <label htmlFor="email">Matric No.</label>
            <input type="number" name="matric_no" id="email" placeholder='Enter your Matric No' />
          </FormInput>

          <div>
            <FormInput>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </FormInput>
            <small className='mt-2 block'><b>Note:</b> Your default password is your surname in lowercase</small>
          </div>

          <button>Submit</button>

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