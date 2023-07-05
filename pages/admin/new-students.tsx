import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { AllSection } from '../../styles/useStyles';
import styled from "styled-components"
import api, { adminStudents } from '../../services/api';
// import { useQuery } from 'react-query';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
// import { convertDate, getInitials } from '../../utils';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from "next/router";
// import UsersTable from '../../components/Users/users-table';
import withAuth from '../../services/withAuth';
import CircleLoader from '@/components/Loader';
import UsersTable from '@/components/users-table';
import AdminLayout from '@/components/adminLayout';
import { convertDate } from '@/utils/reuseables';
import { newStudents } from '@/utils/data';
import { useQuery } from 'react-query';

export const fetchUsers = async (type?: any, page?: any) => {
  var url
  if (type === "drop_offs") {
    url = `super/drop-offs-users`
  }
  else {
    url = `super/${type}-users`
  }
  const response = await api.get(url);
  return response
}

export const getOverview = async () => {
  const response = await api.get(adminStudents);
  return response
}

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [userData, setUserData] = useState<any>({
    // active: [],
    // inactive: [],
    // registered: [],
    // drop-offs: [],
    // verified: [],
    // blocked: [],
  })
  const [currentUsers, setCurrentUsers] = useState<any>("active")
  const router = useRouter()

  const fetchUserData = (type) => {
    setIsFetching(true)
    fetchUsers(type, page)
      .then(res => {
        setUserData({
          ...userData,
          [type]: res.data.data
        })
        setIsFetching(false)
      })
      .catch(error => console.log('error', error));
  }
  const data = userData[`${currentUsers}`]


  const goToUser = (id) => {
    // console.log("go to user")
    router.push(`/admin/users/${id}`)
  }
  const { data: overviewRes, error, isSuccess: isSuccessful, isLoading } = useQuery('allStudents', getOverview, {
    staleTime: Infinity,
    refetchOnWindowFocus: 'always'
  });

  const baseUrl = 'https://studentportalbeta.unilag.edu.ng/(S(2nuegtmwglih1jpo5ja5dpc0))/StudentPassport.aspx?MatricNo='

  return (
    <AdminLayout title="New students">
      <AllSection>
        <section>

          <div className='flex items-center gap-x-4 gap-y-3'>
            <div className="w-full lg:w-8/12 gap-2 items-center justify-between">

              <div className="w-9/12 p-2 gap-2 rounded-lg !bg-[#FCFCFE] items-center border focus-within:border-primary focus-within:shadow-lg shadow-primary h-12"
                style={{ border: "0.5px solid #BDBDBD" }}>
                <FiSearch className="text-2xl text-gray-500" />
                <input
                  placeholder="Search by matric number"
                  className="!bg-transparent !border-none !outline-none placeholder:text-[#9F9FA7] text-base !shadow-none w-full"
                  value={search}
                  onChange={(e) => {
                    const currValue = e.target.value;
                    setSearch(currValue);
                    console.log(currValue)
                    // const filteredData = data.filter((entry) => entry.gateway_reference_details.toLowerCase().includes(currValue));
                    // setDataSource(filteredData);
                  }}
                />
              </div>
            </div>
            {/* <div className="w-full sm:w-1/2 lg:w-2/12 p-2 gap-2 rounded-lg !bg-[#FCFCFE] items-center border focus-within:border-primary focus-within:shadow-lg shadow-primary h-12"
              style={{ border: "0.5px solid #BDBDBD" }}>
              <FiSearch className="text-2xl text-gray-500" />
              <input
                placeholder="Search by User ID"
                className="!bg-transparent !border-none !outline-none placeholder:text-[#9F9FA7] text-base !shadow-none"
                value={search}
                onChange={(e) => {
                  const currValue = e.target.value;
                  setSearch(currValue);
                }}
              />
            </div> */}
            <div className='w-full sm:w-1/2 lg:w-2/12 items-center justify-end gap-4 py-8 '>
              <button className='py-1.5 px-3 h-auto text-sm rounded outlined'
                onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
                disabled={page === 1}
              ><MdOutlineArrowBackIos /></button>

              <button className='py-1.5 px-3 h-auto text-sm rounded'
                onClick={() => setPage(prevState => prevState + 1)}
              ><MdOutlineArrowForwardIos /></button>
            </div>
          </div>
          <div>
            <div>
              {isFetching ? <div className='mx-auto my-10  items-center justify-center'><CircleLoader onModal={true} /></div> : null}
              {/* {userData && data?.[`${ahmeedShit(currentUsers)}`] && */}
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='!text-left'>Matric No</th>
                    <th className='!text-left'>Full Name</th>
                    <th>Department</th>
                    <th>Faculty</th>
                    <th>Phone number</th>
                    <th>Date Created</th>
                    <th><MdOutlineArrowForwardIos className="text text-[#9CA1A5] block ml-auto mr-0" /></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    overviewRes?.data?.data?.map((item, index) => {
                      return (
                        <tr key={index} onClick={() => goToUser(item.matricNo)} className='cursor-pointer hover:bg-gray-50'>
                          <td>{item.matricNo}</td>
                          <td className='leading-3 !text-left'>
                            <div className="items-center gap-4">
                              <img src={baseUrl + item?.matricNo} className=' w-10 h-10  rounded-full shadow' alt="" />

                              <div>
                                <p className="font-medium capitalize text-[#364a63] ">{item.lastName + " " + item.firstName + " " + item.otherNames}</p>
                                <span className="text-xs lowercase text-[#8094ae]">{item.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className='!text-left'>{item.department}</td>
                          <td className='!text-left capitalize'>{item.faculty}</td>
                          {/* <td className='!text-left'>{item.user_id}</td> */}
                          <td>{ item.phoneNumber}</td>
                          <td>{convertDate(item.createdAt)}</td>
                          <td><MdOutlineArrowForwardIos className="text text-[#9CA1A5] block ml-auto mr-0" /></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {/* } */}
            </div>
          </div>
        </section>
      </AllSection>
    </AdminLayout>
  );
};

export const EmptyState = ({ text }) => {
  return (
    <div className="my-24 mx-auto justify-center items-center flex-col gap-3">
      <img className="mx-auto block" src="/empty.svg" alt="empty" />
      <p className=" text-center">
        You have no recent {text || "Users"} yet
      </p>
    </div>
  )
}


export default withAuth(Users);