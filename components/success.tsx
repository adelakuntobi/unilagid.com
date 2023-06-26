
import { Modalstyle } from '@/styles/useStyles';
import { useState, useEffect } from 'react';
import FullPageLoader from './FullpageLoader';
import { DASHBOARD } from '@/utils/pageUrl';
import Link from 'next/link';

const Successful = () => {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
    }, 4000);
  }, [])
  return (
    <Modalstyle>
      {/* {
        showLoader ?
          <div className="flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            <p className='mt-6 text-white'>Loading...</p>
          </div> : */}
      <div className=" max-w-lg bg-white w-full text-black px-6 py-12 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <img src="/img/success.png" className='w-48' alt="" />
          </div>
          <div className="py-8 flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-2 font-bold text-gray-700">Success</h1>
            <p className="text-gray-500 text-center">Your submission was successful and would be reviewed. You will be notified when the review is complete!</p>
          </div>
          <div className="flex justify-center items-center">
            <Link href={DASHBOARD}>
              <button className="bg-green-500 text-white px-20 py-2 rounded-md mt-4">Back to Homepage</button>
            </Link>
          </div>
        </div>
      </div>
      {/* } */}
    </Modalstyle>
  );
};

export default Successful;