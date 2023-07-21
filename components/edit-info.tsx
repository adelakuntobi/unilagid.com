import { useEffect, useState } from 'react';
import AuthLayout from './NewLayout';
import { FormInput } from '@/styles/useStyles';
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-query';
import { getOverview } from '@/pages/dashboard';
import api, { updateUser } from '@/services/api';
import cogotoast from './toaster';
import FullPageLoader from './FullpageLoader';

const EditInfo = (props: any) => {
  const [error, setError] = useState(false)
  const [fields, setFields] = useState({
    "title": "",
    "email": "",
    "gender": "",
    // { phoneNumber: user?.phoneNumber, label: "Phone number", editable: true },
    // { department: user?.department },
    // { faculty: user?.faculty },
    // { address: user?.address, editable: true, width: "full" },
    // { dateOfBirth: user?.dateOfBirth, label: "Date of Birth", },
    // { status: user?.status, label: "Marital status", }

  })

const { data: overviewRes, error: fetchError, isLoading: isInitial, isSuccess: isSuccessful } = useQuery('overviewData', getOverview, {
  staleTime: Infinity,
  refetchOnWindowFocus: 'always'
});

const user = overviewRes?.data?.data

useEffect(() => {
  setFields({
    ...overviewRes?.data?.data
  })
}, [overviewRes?.data])



const theSapa = [
  { title: user?.title },
  { email: user?.email, editable: true },
  { gender: user?.gender },
  { phoneNumber: user?.phoneNumber, label: "Phone number", editable: true },
  { department: user?.department },
  { faculty: user?.faculty },
  { address: user?.address, editable: true, width: "full" },
  { dateOfBirth: user?.dateOfBirth, label: "Date of Birth", },
  { status: user?.status, label: "Marital status", }
]

const { isLoading, mutate: UpdateUser } = useMutation(
  async () => {
    return await api.post(updateUser, { ...fields })
  },
  {
    onSuccess: (response) => {
      const res = response.data
      props.nextStep()
    },
    onError: (res) => {
      const err = res['response'].data;
      cogotoast(err?.message || "Something went wrong, please try again.", "error");
    }
  }
);


const handleChange = (event) => {
  const { name, value } = event.target
  setFields({
    ...fields,
    [name]: value,
  });
};


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  try {
    UpdateUser();
  } catch (err) {
    cogotoast(err.message || "Something went wrong, please try again", "error");
  }
}


if (isInitial) {
  return <FullPageLoader />
}
else
  return (
    <AuthLayout>
      <div className="relative items-center justify-center w-full">
        <div className={`rounded-md bg-white py-6 md:max-w-2xl w-full shadow-lg px-4 lg:px-8 selfie-card block show`}>
          <h1 className='text-3xl '>{`${user?.lastName} ${user?.firstName} ${user?.otherNames}`}</h1>
          <h4 className='text-xl font-semibold'>{user?.matricNo}</h4>
          <form onSubmit={handleSubmit} action="">
            <div className="grid gap-x-5 gap-y-6 py-6 grid-cols-1 md:grid-cols-2">

              {
                theSapa.map((item, index) => {
                  const key = Object.keys(item)[0]
                  const value = item[key]
                  return (
                    <Editables className={item.width ? "md:col-span-2" : undefined} key={key} editable={item.editable}>
                      <label className='capitalize' htmlFor="key">{item.label ?? key}</label>
                      <input type="text" name={key} placeholder={key}
                        className={`!rounded  ${error ? "!border-red-600" : undefined}`}
                        onChange={handleChange}
                        value={fields[`${key}`]} />
                      <small className=' block text-red-600 font-semibold'>{error && "Your Matric No/Password doesn't match. Please try again."}</small>
                    </Editables>
                  )
                })
              }
            </div>
            {
              Object.keys(fields).length === 0 ?
                <button type='button' onClick={() => props.nextStep()} className='w-full mt-6 outlined'>Continue </button> :
                <button type='submit' className='w-full mt-6'>Update Information</button>
            }
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
    background-color: ${(props) => props.editable ? '#fff' : '#f3f4f699'};
    cursor: ${(props) => props.editable ? 'text' : 'not-allowed'};
  }
`

export default EditInfo;