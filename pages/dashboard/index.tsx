import FullPageLoader from '@/components/FullpageLoader';
import Guidelines from '@/components/Guidelines';
import Layout from '@/components/Layout';
import api, { overview } from '@/services/api';
import { NEW_STUDENT, RETURNING_STUDENT } from '@/utils/pageUrl';
import { guidelines2, guidelinesArr } from '@/utils/reuseables';
import Link from 'next/link';
import { useQuery } from 'react-query';
import styled from 'styled-components';

export const getOverview = async () => {
  const response = await api.get(overview);
  return response
}
const Dashboard = () => {

  const { data: overviewRes, error, isSuccess: isSuccessful, isLoading } = useQuery('overviewData', getOverview, {
    staleTime: Infinity,
    refetchOnWindowFocus: 'always'
  });
  const user = overviewRes?.data?.data


  if (isLoading) return <FullPageLoader />
  return (
    <Layout>

      {/* <section>
        <div className='bg-[#219653] text-white  px-10 py-12  relative overflow-hidden'>
          <img src="/img/dashboard-pattern.svg" className='absolute object-cover top-0 left-0 bottom-0 z-0 w-full h-full' alt="" />
          <div className='max-w-7xl mx-auto flex-col md:flex-row items-center justify-between'>
            <div className=''>
              <h4 className='text-2xl font-semibold'>Welcome,<span className='text-3xl'> Oguntunde Victor</span></h4>
              <p className='font-semibold text-lg'>Programme : Bachelor of Science in Electrical and Electronics Engineering</p>
            </div>
            <img className='relative z-10' src="/img/dashboard-header.svg" alt="" />
          </div>
        </div>
      </section> */}

      <section className='bg-gray-50 py-28'>
        <div className='max-w-7xl mx-auto items-center gap-10'>

          <img src={`https://studentportal.unilag.edu.ng/(S(2nuegtmwglih1jpo5ja5dpc0))/StudentPassport.aspx?MatricNo=${user?.matricNo}`} className=' w-56 h-64 rounded-md shadow' alt="" />
          <div className='flex flex-col gap-4 justify-start items-start'>
            {
              user?.newStudent ? <span className='bg-[#219653] text-white text-xs rounded-sm px-2 py-1 font-bold'>Fresh Student</span> :
                <span className='bg-[#ffbe00] text-xs rounded-sm px-2 py-1 font-bold'>Returning Student</span>}
            <div>
              <h1 className='text-5xl font-bold'> <span className='uppercase'>{user?.lastName},</span> {user?.firstName} {user?.otherNames}</h1>
              <h2 className='text-2xl font-bold'>{user?.matricNo}</h2>
            </div>
            <div className='flex flex-wrap gap-x-8 gap-y-1.5 max-w-xl'>
              <HeaderProfile>
                <label>Faculty:</label>
                <p>{user?.faculty}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Department:</label>
                <p>{user?.department}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Gender:</label>
                <p>{user?.gender}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Hostel:</label>
                <p>{user?.hostel}</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Year of Admission:</label>
                <p>{user?.yearOfAdmission}</p>
              </HeaderProfile>
            </div>
            {
              user?.newStudent &&
              <button className=' px-6 py-2.5 rounded-full text-sm h-auto mt-2'>
                Download Virtual Card
              </button>
            }
          </div>

        </div>
      </section>
      <section className='max-w-7xl mx-auto px-4'>
        <div className='mt-8 max-w-5xl'>
          <h4 className='font-bold text-2xl mb-2'>Photo Requirements for Unilag Identity Cards</h4>
          <p className='text-[#495057]'>Photos used for ID cards must meet certain requirements. These include requirements concerning dimensions, photo quality, background, appearance, position, facial expression, glasses, lighting and framing.</p>
        </div>

        <div className='my-6'>
          <h4 className='text-lg font-bold '>Dimensions</h4>
          <div className='grid gap-6 grid-cols-1 lg:grid-cols-2 '>
            <div>
              {
                guidelinesArr.map((guideline, index) => (
                  <Guidelines key={index} guideline={guideline} />
                ))
              }
            </div>
            <div>

              {
                guidelines2.map((guideline, index) => (
                  <Guidelines key={index} guideline={guideline} />
                ))
              }
            </div>
          </div>
          {/* {
          } */}
          <Link href={
            user?.newStudent ? NEW_STUDENT : RETURNING_STUDENT
          }>
            <button className='px-12 mt-8'>Continue</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};


const HeaderProfile = styled.div`
display: flex;
align-items: center;
/* font-size: 14px; */
gap: 5px;
font-weight: 500;
label{
  /* font-weight: 700; */
  color: #908f8f;
}
p{
    font-weight: 600;
    color  : #3d3f45;
    }
`

export default Dashboard;