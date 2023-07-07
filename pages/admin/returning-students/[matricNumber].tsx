import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { AllSection, Modalstyle } from '../../../styles/useStyles';
import styled from "styled-components"
import api, { allReturningStudents } from '../../../services/api';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from "next/router";
import withAuth from '../../../services/withAuth';
import CircleLoader from '@/components/Loader';
import AdminLayout from '@/components/adminLayout';
import { AiOutlineClose } from "react-icons/ai"
import { useQuery } from 'react-query';
import PreLoader from '@/components/preloader';

import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import Link from 'next/link';
import { Document } from 'react-pdf';
import PDFPreview from '@/components/pdfviewer';
import { getWithExpiry } from '@/utils/req';
import cogotoast from '@/components/toaster';
// import UserTransactions from '../../../components/Users/Eachuser/transactions';


const Users = () => {
  const [userdata, setUserdata] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [changeStatus, setChangeStatus] = useState("")
  const [reason, setReason] = useState("")
  const router = useRouter()
  const { matricNumber } = router.query


  const goBack = () => {
    router.back();
  };
  const handleRadioChange = (event) => {
    const selectedOption = event.target.value;
    setReason(selectedOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const token = getWithExpiry("jwtToken")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`/api/admin/student/${matricNumber}`, config);
        const res = await response.json();
        if (res.message === "Student information fetched successfully") {
          const data = res.data
          setIsLoading(false)
          setUserdata(data)
        }
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching data:', error);
      }
    };

    if (matricNumber !== undefined) fetchData();
  }, [matricNumber])
  const baseUrl = 'https://studentportalbeta.unilag.edu.ng/(S(2nuegtmwglih1jpo5ja5dpc0))/StudentPassport.aspx?MatricNo='

  const close = () => {
    setChangeStatus("")
  }

  const submit = async () => {
    if (changeStatus !== "") {
      setIsLoading(true)
      var sentReason
      if (changeStatus === "rejected" && reason === "") { cogotoast("Select a reason", "error"); setIsLoading(false); }
      else {

        sentReason = reason

        try {
          const token = getWithExpiry("jwtToken")

          const response = await fetch(`/api/admin/student/approve`, {
            method: "POST",
            body: JSON.stringify({
              matricNo: Number(matricNumber),
              status: changeStatus,
              reason: sentReason
            }),
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const res = await response.json();
          if (res.message === "Student information updated successfully") {
            const data = res.data
            setChangeStatus("")
          }
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          console.error('Error fetching data:', error);
        }
      }
    }
  }
  return (
    <AdminLayout title={String(matricNumber)}>
      <AllSection>
        <section>
          <div onClick={goBack} className='text-lg items-center mb-6 gap-3 hover:text-primary cursor-pointer'>
            <MdOutlineKeyboardBackspace className='text-2xl' /> Back
          </div>
          <div className='items-center justify-between gap-4 mb-2'>
            <div>
              {
                isLoading ?
                  <>
                    <PreLoader width="w-96 p-3 mb-2" />
                    <PreLoader width="w-64 " />
                  </> :
                  <>
                    <h2 className='text-lg !pb-1'>{userdata?.['user']?.lastName + " " + userdata?.user?.firstName + " " + userdata?.user?.otherNames}</h2>
                    <p className=" leading-none">{userdata?.user?.email}</p>

                  </>
              }

            </div>
            {
              isLoading ? <PreLoader width="w-32 " /> :
                <div className="!inline-flex items-center flex-col font-bold text-2xl gap-2">
                  {
                    userdata?.user?.newStudent ?
                      <div className="flex items-center gap-2 bg-green-500 uppercase text-white py-2 px-3 rounded-md">
                        <BsPatchCheckFill size={20} fill="white" />
                        <p className="text-sm font-bold tracking-wide">New Student</p>
                      </div> :
                      <div className="flex items-center gap-2 bg-yellow-500 uppercase text-white py-2 px-3 rounded-md">
                        <BsPatchCheckFill size={20} fill="white" />
                        <p className="text-sm font-bold tracking-wide">Returning Student</p>
                      </div>
                  }
                </div>
            }

          </div>
          <div className="flex gap-8 flex-col lg:flex-row ">
            <div className={`w-full lg:w-6/12 bg-white py-6 rounded-xl gap-5 flex-col items-center`}>

              <div className="grid gap-6 grid-cols-2 w-full ">
                {
                  isLoading ?
                    <>
                      <span className='block p-2 bg-gray-200 animate-pulse rounded h-96 lg:h-64 w-full '></span>
                      <span className='block p-2 bg-gray-200 animate-pulse rounded h-96 lg:h-64 w-full '></span>
                    </>
                    :
                    <>
                      <div>
                        <img className="w-full h-96 lg:h-64 object-cover rounded"
                          src={baseUrl + userdata?.user?.matricNo}
                          alt="" />
                        <label className="text-sm font-medium mt-4 text-center block">JAMB Picture</label>
                      </div>
                      {
                        userdata?.user?.newStudent &&
                        <div>
                          <img className="w-full h-96 lg:h-64 object-cover rounded" src={"data:image/jpeg;base64,"+userdata?.biometrics?.selfie}
                            alt="" />
                          <label className="text-sm font-medium mt-4 text-center block">Selfie Registered</label>
                        </div>
                      }
                    </>
                }
              </div>
            </div>
            <div className='border-l'></div>
            <div className={`w-full bg-white py-6 rounded-xl gap-5 flex flex-col`}>
              <div className="w-full">
                <h4 className="text-sm font-bold text-[#8094ae] tracking-widest mb-4">USER DETAILS</h4>

                <div className="grid gap-6">
                  <div className="grid gap-6 grid-cols-2">

                    <ShortDetails >
                      <label>Faculty</label>
                      {
                        isLoading ? <PreLoader width="w-32 " /> :
                          <p className='capitalize'>{userdata?.user?.faculty}</p>
                      }
                    </ShortDetails>
                    <ShortDetails >
                      <label>Department</label>
                      {
                        isLoading ? <PreLoader width="w-32 " /> :
                          <p>{userdata?.user?.department}</p>
                      }
                    </ShortDetails>
                  </div>
                  <div className="grid gap-6 grid-cols-2">
                    <ShortDetails >
                      <label>Gender</label>
                      {
                        isLoading ? <PreLoader width="w-32 " /> :
                          <p className='capitalize'>{userdata?.user?.gender}</p>
                      }
                    </ShortDetails>
                    <ShortDetails >
                      <label>Matric No</label>
                      {
                        isLoading ? <PreLoader width="w-32 " /> :
                          <p>{userdata?.user?.dateOfBirth}</p>
                      }
                    </ShortDetails>
                  </div>
                  <div className="grid gap-6 grid-cols-2">
                    <ShortDetails>
                      <label>Phone Number</label>
                      {
                        isLoading ? <PreLoader width="w-44 " /> :
                          <p>{userdata?.user?.phoneNumber}</p>
                      }
                    </ShortDetails>
                    <ShortDetails>
                      <label>Year of Admission</label>
                      {
                        isLoading ? <PreLoader width="w-44 " /> :
                          <p>{(userdata?.user?.yearOfAdmission)}</p>
                      }
                    </ShortDetails>
                  </div>
                  <ShortDetails>
                    <label>Address</label>
                    {
                      isLoading ? <PreLoader width="w-32 " /> : <p>{userdata?.user?.address}</p>
                    }
                  </ShortDetails>
                </div>
              </div>
              {
                !userdata?.user?.newStudent ?

                  <div className="w-full my-10">
                    <h4 className="text-sm font-bold text-[#8094ae] tracking-widest mb-4 uppercase">Documents Submitted</h4>

                    <div className="grid gap-6 grid-cols-2 w-full ">

                      {
                        isLoading ?
                          <>
                            <span className='block p-2 bg-gray-200 animate-pulse rounded w-full '></span>
                            <span className='block p-2 bg-gray-200 animate-pulse rounded w-full '></span>
                          </>
                          :
                          <>
                            <ShortDetails>
                              <label>Affidavit</label>
                              {
                                isLoading ? <PreLoader width="w-44 " /> :
                                  <a target='_blank' className='text-primary underline font-semibold w-full cursor-pointer ' style={{ overflowWrap: "break-word" }}>{`https://unilagid.com/documents/student/160403048/` + userdata?.documents?.affidavit}</a>
                              }
                            </ShortDetails>
                            <ShortDetails>
                              <label>Police report</label>
                              {
                                isLoading ? <PreLoader width="w-44 " /> :
                                  <a target='_blank' className='text-primary underline font-semibold w-full cursor-pointer ' style={{ overflowWrap: "break-word" }}>{`https://unilagid.com/documents/student/160403048/` + userdata?.documents?.policereport}</a>
                              }
                            </ShortDetails>
                          </>
                      }
                    </div>
                  </div>
                  :
                  <div className="w-full my-10">
                    <h4 className="text-sm font-bold text-[#8094ae] tracking-widest mb-4 uppercase">Signature</h4>

                    <div className="grid gap-6 grid-cols-2 w-full ">
                      {
                        isLoading ?
                          <>
                            <span className='block p-2 bg-gray-200 animate-pulse rounded h-auto w-full '></span>
                            {/* <span className='block p-2 bg-gray-200 animate-pulse rounded h-96 lg:h-64 w-full '></span> */}
                          </>
                          :
                          <>
                            <div className="w-full h-auto object-cover border rounded">

                              <img src={userdata?.biometrics?.signature}
                                alt="" />
                            </div>
                          </>
                      }
                    </div>
                  </div>

              }
              {
                userdata?.document?.status === "pending"
                &&
                <div className="items-center w-full justify-end gap-6 mt-10 pt-10 border-t">
                  <button className={`text-sm  !py-3 h-auto bg-[#FEE4E2] text-[#510404] border-[#510404] hover:bg-red-100 px-6 w-fit`}
                    onClick={() => setChangeStatus("rejected")} disabled={isLoading}>
                    Reject application
                  </button>
                  <button className={`text-sm h-auto !py-3 px-6 w-fit bg-[#510404] border-[#510404] text-white`}
                    onClick={() => setChangeStatus("approved")} disabled={isLoading}>
                    Approve application
                  </button>
                </div>
              }

            </div>
          </div>
        </section>

      </AllSection>

      {
        changeStatus !== "" &&
        <Modalstyle>
          <div className=" max-w-lg bg-white w-full text-black px-6 py-6 rounded-lg flex gap-6 flex-col relative">
            <AiOutlineClose className="absolute top-5 right-6 text-xl cursor-pointer" onClick={close} />
            {
              changeStatus === "rejected" ?
                <>
                  <img src="/img/reject.svg" className='w-16' alt="" />
                  <div>
                    <h4 className="text-2xl mb-2 font-bold text-[#101828]  ">Reject Application</h4>
                    <p className=" text-[#475467]">You are about to reject this application. Please check all criteria not met below</p>
                  </div>

                  <form action="" className='flex gap-3 flex-col'>
                    <div className='items-center gap-2 cursor-pointer'>
                      <input className='w-5 h-5' type="radio" id="radio1" name="radioGroup"
                        value="Documents are incomplete"
                        checked={reason === "Documents are incomplete"}
                        onChange={handleRadioChange} />
                      <label className='text-[#495057]' htmlFor="radio1">Documents are incomplete</label>
                    </div>

                    <div className='items-center gap-2 cursor-pointer'>
                      <input className='w-5 h-5' type="radio" id="radio2" name="radioGroup" value="Documents are not verifiable"
                        checked={reason === "Documents are not verifiable"}
                        onChange={handleRadioChange} />
                      <label className='text-[#495057]' htmlFor="radio2">Documents are not verifiable</label>
                    </div>

                    <div className='items-center gap-2 cursor-pointer'>
                      <input className='w-5 h-5' type="radio" id="radio3" name="radioGroup"
                        value="Documents are not properly stamped"
                        checked={reason === "Documents are not properly stamped"}
                        onChange={handleRadioChange} />
                      <label className='text-[#495057]' htmlFor="radio3">Documents are not properly stamped</label>
                    </div>

                    {/* <button className='bg-[#FEE4E2] text-[#510404] border-[#510404] mt-6'>Reject Application</button> */}
                  </form>
                </>
                :
                <>
                  <img src="/img/approve.svg" className='w-16' alt="" />
                  <div>
                    <h4 className="text-2xl mb-2 font-bold text-[#101828]  ">Approve Application</h4>
                    <p className=" text-[#475467]">You are about to accept this application. This action can not be reverse</p>
                  </div>
                </>

            }
            <div className="items-center w-full gap-6 mt-6">
              <button className={` !py-3 h-auto bg-[#fff] text-[#000] border-[#D0D5DD] hover:bg-red-100 px-6 w-full`} disabled={isLoading}
                onClick={close}>
                Cancel
              </button>
              <button className={`h-auto !py-3 px-6 w-full bg-[#510404] border-[#510404] text-white`} onClick={submit} disabled={isLoading}>
                Confirm
              </button>
            </div>
          </div>
        </Modalstyle>

      }
    </AdminLayout>
  );
};



const ShortDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label{
    display: block;
    font-size: 14px;
    color: #8094ae;
  }
  p{
    font-size: 18px;
    color: #526484;
  }
`
const Trans = styled.div`
  background: #FFFFFF;
  border: 1px solid #EAECF0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  width: 100%;

  label{
    color: #101828;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 2.5rem;
    display: block;
  }
  h5{
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #101828;
  }
`
export default withAuth(Users);