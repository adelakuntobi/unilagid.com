
import { Modalstyle } from '@/styles/useStyles';
import { useState, useEffect } from 'react';
import FullPageLoader from './FullpageLoader';
import { DASHBOARD } from '@/utils/pageUrl';
import Link from 'next/link';

const IsError = () => {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
    }, 4000);
  }, [])
  return (
    <Modalstyle>
      <div className=" max-w-lg bg-white w-full text-black px-6 py-12 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <img src="/img/error.png" className='w-48' alt="" />
          </div>
          <div className="py-8 flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-2 font-bold text-gray-700">Verification Failed</h1>
            <p className="text-gray-500 text-center">Your submission was successful and would and has been reviewed. You have to a more clearer picture with better lightening.</p>
          </div>
          <div className="flex justify-center items-center">
            <Link href={DASHBOARD}>
              <button className="bg-green-500 text-white px-16 py-2 rounded-md mt-4">Try again</button>
            </Link>
          </div>
        </div>
      </div>
    </Modalstyle>
  );
};

export default IsError;