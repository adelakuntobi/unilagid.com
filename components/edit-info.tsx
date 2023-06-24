import React, { useState } from 'react';
import AuthLayout from './NewLayout';
import { FormInput } from '@/styles/useStyles';
import styled from 'styled-components'

const EditInfo = (props: any) => {
  const [error, setError] = useState(false)
  const [fields, setFields] = useState({
    matricNo: '',
    password: ''
  })


  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setError(false)
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  
  const theSapa = [
    { title: "Mr.", },
    { email: "ade.tobi@zoho.mail", editable: true },
    { gender: "Male" },
    { phone: "0812 345 6789", editable: true },
    { department: "Computer Science" },
    { faculty: "Science" },
    { address: "No 1, Oba Street, Ibadan, Oyo State", editable: true, width: "full" },
    // { yearOfStudy: "2", editable: false, label: "Year of Study", },
    // { religion: "Christianity", label: "Religion", },
    { dateOfBirth: "12/12/2000", label: "Date of Birth", },
    { maritalStatus: "Single", label: "Marital status", }
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.nextStep()

  }
  return (
    <AuthLayout>
      <div className="relative items-center justify-center w-full">
        {/* <div className={`container rounded-md bg-white py-10 selfie-card block show`}> */}
        <div className={`rounded-md bg-white py-6 md:max-w-2xl w-full shadow-lg px-4 lg:px-8 selfie-card block show`}>
          <h1 className='text-3xl '>Adelakun Oluwatobiloba Ayomipo </h1>
          <h4 className='text-xl font-semibold'>160403048</h4>
          <form onSubmit={handleSubmit} action="">
            <div className="grid gap-x-5 gap-y-6 py-6 grid-cols-2">

              {
                theSapa.map((item, index) => {
                  const key = Object.keys(item)[0]
                  const value = item[key]
                  return (
                    <Editables className={item.width ? "col-span-2" : undefined} key={key} editable={item.editable}>
                      <label className='capitalize' htmlFor="key">{item.label ?? key}</label>
                      <input type="text" name={key} placeholder='Mr.'
                        className={`!rounded ${error ? "!border-red-600" : undefined}`}
                        onChange={handleChange}
                        value={value} />

                      <small className=' block text-red-600 font-semibold'>{error && "Your Matric No/Password doesn't match. Please try again."}</small>
                    </Editables>
                  )
                })
              }
            </div>
            <button className='w-full mt-6'>Continue</button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};
export interface FormProps {
  readonly editable: boolean;
};

export const Editables = styled(FormInput) <FormProps>`
  input{
    border-radius: 4px;
    font-weight: 600;
    /* color: #667085;  */
    /* check for props editable to toggle background */
    background-color: ${(props) => props.editable ? '#fff' : '#f3f4f699'};
    cursor: ${(props) => props.editable ? 'text' : 'not-allowed'};
  }

`

export default EditInfo;