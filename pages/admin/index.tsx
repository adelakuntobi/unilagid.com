import { NextPage } from 'next'
import { useQuery } from 'react-query'
import { RiWalletLine } from "react-icons/ri"
import { GrTransaction } from "react-icons/gr"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useState, useEffect } from 'react'
import Select from 'react-select'
import AdminLayout from '@/components/adminLayout'
import PreLoader from '@/components/preloader'
import withAuth from '@/services/withAuth'
import PreLoadingBox from '@/components/PreloadingBox'
import { AllSection } from '@/styles/useStyles'
import api, { adminOverview } from '@/services/api'
import { numberWithCommas } from '@/utils/reuseables';


export const getOverview = async () => {
  const response = await api.get(adminOverview);
  return response
}

const options = [
  { value: '0', label: 'Today' },
  { value: '1', label: 'This week' },
  { value: '4', label: 'This month' },
  { value: '24', label: 'Last 6 months' },
  { value: '48', label: 'This year' },
  { value: 'all', label: 'All time' },
];

const AdminDashboard: NextPage = () => {
  const [userFilterBy, setUserFilterBy] = useState({ value: '0', label: 'Today' });
  const [transactionFilterBy, setTransactionFilterBy] = useState({ value: '0', label: 'Today' },);
  const [isFetching, setIsFetching] = useState(false)
  const [isTransFetching, setIsTransFetching] = useState(false)
  const [usersCount, setUsersCount] = useState({
    all_users: '',
    registered_user: '',
    active_users: '',
    inactive_users: '',
    drop_offs: '',
    verified_users: '',
    pending_users: '',
    failed_users: '',
    blocked_users: ''
  })
  const [transactionsCount, setTransactionsCount] = useState({
    successful_transaction_amount: "",
    successful_transaction_count: "",
    failed_transaction_count: "",
    settlement_amount: "",
    pending_count: ""
  })


  const { data: overviewRes, error, isSuccess: isSuccessful, isLoading } = useQuery('overviewData', getOverview);
  const overviewData = overviewRes?.data?.data

  useEffect(() => {
    setUsersCount(overviewData?.users_count)
    setTransactionsCount(overviewData?.transactions)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessful])

  const verificationCount = [
    {
      name: "Total count",
      value: overviewData?.dollar_details.available_balance,
      icon: RiWalletLine
    },
    {
      name: "New students",
      value: overviewData?.dollar_details.cards_balance,
      icon: RiWalletLine
    },
    {
      name: "Returning students",
      value: overviewData?.dollar_details.total_usd_funded,
      icon: RiWalletLine
    },
  ]

  // const overviewList = [
  //   {
  //     name: "All Users",
  //     value: usersCount?.all_users,
  //   },
  //   {
  //     name: "Verified Users",
  //     value: usersCount?.verified_users,
  //   },
  //   {
  //     name: "Active Users",
  //     value: usersCount?.active_users,
  //   },
  //   {
  //     name: "Inactive Users",
  //     value: usersCount?.inactive_users,
  //   },
  //   {
  //     name: "Dropoff Users",
  //     value: usersCount?.drop_offs,
  //   },
  //   {
  //     name: "Blocked Users",
  //     value: usersCount?.blocked_users,
  //   },
  //   {
  //     name: "Pending Verifications",
  //     value: usersCount?.pending_users,
  //   },
  //   {
  //     name: "Failed Verifications",
  //     value: usersCount?.failed_users,
  //   },
  // ]


  // const handleTransChange = (e) => {
  //   setTransactionFilterBy(e)
  //   setIsTransFetching(true)
  //   getCount("transactions", e.value)
  //     .then(res => {
  //       if (res.data.status === "success") {
  //         setTransactionsCount(res?.data?.data?.transactions)
  //       }
  //       // console.log(res.data.data)
  //       setIsTransFetching(false)
  //     })
  //     .catch(error => console.log('error', error));
  // }

  return (
    <AdminLayout title="Overview">
      <AllSection>


        <section>
          <h2>Dashboard</h2>
          <div className="cards three">
            {
              verificationCount.map((item, index) => (
                isSuccessful ?
                  <div key={index} className="bg-white flex flex-col w-full px-6 py-6 border-[#eff2f6] shadow rounded relative">
                    <div className="items-center gap-2 ">
                      {/* <item.icon size={24} className="opacity-100" /> */}
                      <label htmlFor="" className="  text-[#364a63] tracking-tight">{item.name}</label>
                    </div>
                    <h3 className="text-2xl font-semibold pt-10 text-[#364a63]">$ {numberWithCommas(item.value)}</h3>
                  </div>
                  :
                  <PreLoadingBox key={index} />
              ))
            }
          </div>
        </section>

        <section>
          <h2>Registration chart</h2>

          <div className='grid gap-8 grid-cols-2'>
<div></div>
<div></div>
          </div>
        </section>


        {/* <section>
          <div className='items-center justify-between mb-3'>
            <h2 className='!pb-0'>Users</h2>
            {
              isFetching || !isSuccessful ?
                <PreLoader width="w-32" /> :
                <Select
                  defaultValue={userFilterBy}
                  // onChange={handleSelectChange}
                  options={options}
                  placeholder="Filter by Date"
                  className='w-36'
                />
            }
          </div>
          <div className="cards">
            {
              overviewList.map((item, index) => (
                isSuccessful ?
                  <div key={index} className="bg-white flex flex-col w-full px-6 py-6 border-[#eff2f6] shadow rounded relative">

                    <div className="items-center gap-2 ">
                      <label htmlFor="" className="  text-[#364a63] tracking-tight">{item.name}</label>
                    </div>
                    {
                      isFetching ?
                        <PreLoader width="w-32 mt-12" /> :
                        <h3 className="text-2xl font-semibold pt-10 text-[#364a63]">{(item.value)}</h3>
                    }
                  </div>
                  :
                  <PreLoadingBox key={index} />
              ))
            }
          </div>
        </section> */}
      </AllSection>
    </AdminLayout>
  )
}

export default withAuth(AdminDashboard)
