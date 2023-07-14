import { NextPage } from 'next'
import { useQuery } from 'react-query'
import { RiWalletLine } from "react-icons/ri"
import { GrTransaction } from "react-icons/gr"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/adminLayout'
import PreLoader from '@/components/preloader'
import withAuth from '@/services/withAuth'
import PreLoadingBox from '@/components/PreloadingBox'
import { AllSection } from '@/styles/useStyles'
import api, { adminOverview } from '@/services/api'
import { numberWithCommas } from '@/utils/reuseables';
import BarChart from '@/components/Barchart';
import Link from 'next/link';


// export const getOverview = async () => {
//   const response = await api.get(adminOverview);
//   return response
// }

const options = [
  { value: '0', label: 'Today' },
  { value: '1', label: 'This week' },
  { value: '4', label: 'This month' },
  { value: '24', label: 'Last 6 months' },
  { value: '48', label: 'This year' },
  { value: 'all', label: 'All time' },
];

const AdminDashboard: NextPage = () => {
  // const [userFilterBy, setUserFilterBy] = useState({ value: '0', label: 'Today' });
  // const [transactionFilterBy, setTransactionFilterBy] = useState({ value: '0', label: 'Today' },);
  const [isLoading, setIsLoading] = useState(false)
  const [userdata, setUserdata] = useState<any>({})


  const verificationCount = [
    {
      name: "Total count",
      value: Number(userdata?.total),
      icon: RiWalletLine,
      route: "/admin"
    },
    {
      name: "New students",
      value: Number(userdata?.newStudents),
      icon: RiWalletLine,
      route: "/admin/new-students"
    },
    {
      name: "Returning students",
      value: Number(userdata?.returning),
      icon: RiWalletLine,
      route: "/admin/returning-students"
    },
  ]



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/admin");
        const res = await response.data;
        if (res?.['message'] === "Details fetched successfully") {
          const data = res.data
          setIsLoading(false)
          setUserdata(data)
        }
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
  }, [])

  return (
    <AdminLayout title="Overview">
      <AllSection>


        <section>
          <h2>Dashboard</h2>
          <div className="cards three">
            {
              verificationCount.map((item, index) => (
                (Object.keys(userdata).length !== 0) ?
                  <Link href={item.route} key={index} className="bg-white flex flex-col w-full px-6 py-6 border-[#eff2f6] shadow rounded relative">
                    <div className="items-center gap-2 ">
                      <label htmlFor="" className="text-[#364a63] tracking-tight">{item.name}</label>
                    </div>
                    <h3 className="text-2xl font-semibold pt-10 text-[#364a63]">{numberWithCommas(item.value)}</h3>
                  </Link>
                  :
                  <PreLoadingBox key={index} />
              ))
            }
          </div>
        </section>

        <section>
          <h2>Registration chart</h2>
          <div className=' w-4/5 '>
            <BarChart />
          </div>

          {/* <div className='grid gap-8 grid-cols-2'>
            <div>

            </div>
            <div></div>
          </div> */}
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
