import { useState } from 'react'
import Logo from '@/components/Logo';
import cogotoast from '@/components/toaster';
import Head from 'next/head';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'


import { setWithExpiry } from '../utils/req';
import api, { createStudent } from '../services/api'
import CircleLoader from '@/components/Loader';
import { FormInput } from '@/styles/useStyles';
import { faculties } from '@/utils/data';
import Successful from '@/components/success';




const CreateUser = () => {

  const [fields, setFields] = useState<any>({
    faculty: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [faculty, setFaculty] = useState([])
  const [error, setError] = useState(false)
  const router = useRouter()

  const { isLoading, mutate: LoginUser, isSuccess } = useMutation(
    async () => {
      return await api.post(createStudent, { ...fields, })
    },
    {
      onSuccess: (response) => {
        const res = response.data
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
      <div className='h-screen grid place-items-center bg-green-50 py-20 px-4 overflow-y-scroll'>
        <img src='/img/patterns/pattern-7.png' className='z-10 object-cover absolute top-0 right-0 h-full w-full' alt="" />
        <div className=''>
          <div className="justify-center w-full mb-4">
            <Logo />
          </div>
          <form onSubmit={handleSubmit} className='bg-white relative z-50 shadow-md max-w-2xl w-full px-4 md:px-6 py-6 md:py-12 rounded-lg flex flex-col gap-8'>
            <div className='justify-left flex-col gap-1'>
              <h2 className='text-2xl md:text-3xl text-left'>Create Student</h2>
              <p className='text-left mx-auto text-sm md:text-lg text-[#475467]'>Using your valid school credentials, create yourself as a student on the platform.</p>
              <small className='font-bold text-red-500'>NOTE: All fields are mandatory</small>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>

              <FormInput>
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" placeholder='Abisoye'
                  onChange={handleChange} />
              </FormInput>
              <FormInput>
                <label htmlFor="email">Last name</label>
                <input type="text" name="lastName" placeholder='Mohammed'
                  onChange={handleChange} />
              </FormInput>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>

              <FormInput>
                <label htmlFor="otherNames">Other name</label>
                <input type="text" name="otherNames" placeholder='Asumptha'
                  onChange={handleChange} />
              </FormInput>
              <FormInput>
                <label htmlFor="matricNo">Matric No</label>
                <input type="number" name="matricNo" placeholder='120305678'
                  onChange={handleChange} />
              </FormInput>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>

              <FormInput>
                <label htmlFor="title">Title</label>
                <select name="title"  onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </FormInput>
              <FormInput>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='john.mohammed@usermail.com'
                  onChange={handleChange} />
              </FormInput>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>
              <FormInput>
                <label htmlFor="title">Gender</label>
                <select name="gender" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </FormInput>
              <FormInput>
                <label htmlFor="email">Phone number</label>
                <input type="number" name="phoneNumber" placeholder='0810 234 5678'
                  onChange={handleChange} />
              </FormInput>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>
              <FormInput>
                <label htmlFor="faculty">Faculty</label>
                <select name="faculty" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="arts">Arts</option>
                  <option value="education">Education</option>
                  <option value="science">Sciences</option>
                  <option value="law">Law</option>
                  <option value="bizAdd">Management Sciences</option>
                  <option value="socialSciences">Social Sciences</option>
                  <option value="engineering">Engineering</option>
                  <option value="environmental">Environmental Sciences</option>
                </select>
              </FormInput>
              <FormInput>
                <label htmlFor="department">Department</label>
                <select name="department" onChange={handleChange}>
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
            </div>
            <FormInput>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" placeholder='40, Yeguban street, Iransi '
                onChange={handleChange} />
            </FormInput>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>
              <FormInput>
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" name="dateOfBirth" onChange={handleChange} />
              </FormInput>
              <FormInput>
                <label htmlFor="hostel">Status</label>
                <select name="hostel" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </FormInput>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>
              <FormInput>
                <label htmlFor="yearOfAdmission">Year of Admission</label>
                <select name="yearOfAdmission" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="2017/2018">2017/2018</option>
                  <option value="2018/2019">2018/2019</option>
                  <option value="2019/2020">2019/2020</option>
                  <option value="2020/2021">2020/2021</option>
                </select>
              </FormInput>
              {/* <FormInput>
                <label htmlFor="hostel">Status</label>
                <select name="status" onChange={handleChange}>
                  <option value="">-- Please Select --</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </FormInput> */}
            </div>
            <button className='!w-full mt-6' disabled={isLoading}>
              {
                isLoading ? <CircleLoader /> : "Submit"
              }
            </button>


          </form>
        </div>
      </div>

      {
      isSuccess && <Successful />
      }
    </>
  );
};

export default CreateUser;