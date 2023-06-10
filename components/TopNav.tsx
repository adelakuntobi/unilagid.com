import { logOutAction } from '@/utils/auth';
import Logo from './Logo';
import { IoMdNotificationsOutline } from "react-icons/io"


const TopNav = () => {
 
  return (
    <nav className=' py-5 shadow-md ' >
      <section className='max-w-7xl mx-auto items-center justify-between'>
        <Logo />


        <div className='items-center gap-6'>
          {/*  <div>
            <h4 className='font-semibold'>Aderonke Adeniran</h4>
            <p className='text-sm text-right'>160408882</p>
          </div>
          <img src="/img/student3.png" className='w-10 h-10 rounded-full' alt="" /> */}
          {/* <div className='h-10 w-12 rounded-md grid place-items-center'> */}
            {/* <IoMdNotificationsOutline className='text-gray-400 text-2xl' /> */}
          {/* </div> */}
          <p className='text-primary font-semibold text-sm'>Check ID Card Status</p>

          <button onClick={logOutAction} className='rounded px-6 py-2.5 h-auto text-sm tracking-wide'>Logout</button>
        </div>
      </section>
    </nav>
  );
};

export default TopNav;