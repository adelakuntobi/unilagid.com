import React from 'react';
import { useQuery } from 'react-query';
import { getOverview } from '@/pages/dashboard';
import FullPageLoader from '@/components/FullpageLoader';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const IdCard = () => {
  const { data: overviewRes, error: fetchError, isLoading, isSuccess: isSuccessful } = useQuery(
    ["overviewData"],
    getOverview,
    { staleTime: 60000 }
  );
  const user = overviewRes?.data?.data
  const bio = overviewRes?.data?.biometrics
  // const testUser = {
  //   "_id": "64a7cd32d787e15cc68bcfac",
  //   "firstName": "Daphnee",
  //   "lastName": "Kohler",
  //   "otherNames": "Shawna",
  //   "email": "Cyril_Turner13@yahoo.com",
  //   "phoneNumber": "283-600-4477 x686",
  //   "dateOfBirth": "4/1/2023",
  //   "address": "583 Glover Terrace",
  //   "gender": "male",
  //   "status": "married",
  //   "newStudent": false,
  //   "firstLogin": false,
  //   "title": "Mr",
  //   "department": "Medical Microbiology & Parasitology",
  //   "faculty": "medical_sciences",
  //   "hostel": "Makama-Bida",
  //   "yearOfAdmission": "2016/2017",
  //   "matricNo": 160403070,
  //   "password": "kohler",
  //   "createdAt": "2023-07-07T08:30:42.045Z",
  //   "updatedAt": "2023-07-07T08:30:42.045Z",
  //   "__v": 0
  // }
  const baseUrl = process.env.IMAGE_URL
  const replaceWithSpace = (text) => {
    var newStr = text.replace(/_/g, ' ');
    var capitalizedStr = newStr.charAt(0).toUpperCase() + newStr.slice(1);
    return capitalizedStr
  }

  const handlePrint = () => {

    // html2canvas(document.querySelector("#capture"), { scale: 15 }).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, 'PNG', 0, 0, 200, 400);
    // });
    
    // const divElement = divRef.current;
    const hideElements = document.getElementsByClassName('content');
    
    html2canvas(document.querySelector("#capture"), { scale: 15 }).then((canvas) => {
      
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0,  204, 322);
      pdf.save("StudentCopyIDcard " + user?.lastName + " " + user?.firstName + ".pdf");
       
    });

  }

  if (!isLoading) {
    return (
      <div>
      <div className='w-[204px] h-[322px] relative' id='capture'>
        <svg width="204" height="322" viewBox="0 0 204 322" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3_114)">
            <rect width="204" height="322" rx="10 " fill="white" />
            <path d="M129 303.627C166.5 304.008 194.5 289.336 204 281V289.336C166.5 308.5 150.5 306.5 129 303.627Z" fill="#219653" />
            <path d="M0 301.431V309C51.5 285.562 91.5 298.178 98 299.439C57.6 282.282 16 295.654 0 301.431Z" fill="#219653" />
            <path d="M0 314.636V322H204V295C172.078 310.709 147.138 310.953 126.688 307.272C59.8521 295.24 35.912 296.227 0 314.636Z" fill="#219653" />
            <path d="M111.273 43.0935C64.6585 32.6916 29.5725 40.1215 0 53V0H204V34.6729C172.322 49.3346 125.307 46.2252 111.273 43.0935Z" fill="#219653" />
            <path d="M106 48.6189C56.4 39.4189 14.6667 58.7855 0 69.6189V73.6189C40 47.6189 87.3333 46.1189 106 48.6189Z" fill="#219653" />
            <path d="M107 45.6188C60.5 35.1189 17.3333 49.9522 0 58.6188V64.1187C39.5 39.1189 89.5 42.7806 107 45.6188Z" fill="#219653" />
            <path d="M119.5 46.5C165.5 52 189 44.5 204 38.5V42.5C170.5 52.5 133.5 50 119.5 46.5Z" fill="#219653" />
            <path d="M119 49.5C157 57.5 191.5 51.5 204 46.5V51.5C164 60 130 52.5 119 49.5Z" fill="#219653" />
            <rect x="52" y="60" width="100" height="100" rx="50" stroke="#219653" />

          </g>
          <defs>
            <clipPath id="clip0_3_114">
              <rect width="204" height="322" rx="5" fill="white" />
            </clipPath>
          </defs>
        </svg>


        <p className='absolute -rotate-45 opacity-20 text-primary-600 text-lg uppercase top-12  right-0 left-0 m-auto'>not for offical use</p>
        <p className='absolute -rotate-45 opacity-20 text-primary-600 text-lg uppercase top-32  right-0 left-2 m-auto'>not for offical use</p>
        {/* <p className='absolute -rotate-45 opacity-30 text-primary-600 text-xl uppercase top-48  right-0 left-0 m-auto'>not for offical use</p> */}
        <p className='absolute -rotate-45 opacity-20 text-primary-600 text-lg uppercase top-52  right-0 left-4 m-auto'>not for offical use</p>
        <div className=''>
          <img src={baseUrl + user?.matricNo} alt=""
            className='absolute left-0 right-0 mx-auto top-[61px] w-[98px] h-[98px] object-cover rounded-full' />
          <div>
            <ul className='text-[9px] absolute bottom-16 left-2 font-medium'>
              <li className='leading-loose'>NAME: <b className='uppercase'>{user?.lastName} </b> {`${user?.firstName} ${user?.otherNames}`}</li>
              <li className='leading-loose'>MATRIC NO: <b>{user?.matricNo}</b></li>
              <li className='leading-loose capitalize'>FACULTY: {replaceWithSpace(user?.faculty)}</li>
              <li className='leading-loose'>DEPARTMENT: {user?.department}</li>
              {/* <li className='grid grid-cols-2 gap-4'>
                  <div>
                    Gender: {user?.department}
                  </div>
                  <div>
                    Hostel: {user?.hostel}
                  </div>
                </li> */}
            </ul>
          </div>
          <div className='text-[6px] absolute bottom-6 right-5'>
            <div className='bg-gray-50 w-[60px] h-6 rounded '>
              <img src={bio?.signature} className='h-full w-full'
                alt="" />
            </div>
            <label className='text-center'>Holder&#39;s Signature</label>
          </div>
        </div>
        
      </div>
      {
          user?.newStudent && bio?.status === "approved" &&
          <button onClick={handlePrint} className=' px-6 py-2.5 rounded-full text-sm h-auto mt-2'>
            Download Virtual Card
          </button>
        }
      </div>
    );
  }
  else return <FullPageLoader />
};

export default IdCard;