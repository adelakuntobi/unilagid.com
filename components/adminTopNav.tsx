import Link from 'next/link';
import { FiUser } from "react-icons/fi"

const AdminTopNav = ({ heading }) => {
  return (
    <nav className=" max-w-[1520px] mx-auto pt-6 pb-7 px-8 items-center justify-between border-b border-[#EAECF0]">
      <h2 className='text-[#101828] font-bold text-3xl'>{heading}</h2>

      <div className="items-center gap-2">
        {/* <div className="rounded-full h-9 w-9 satoshi grid place-items-center text-white bg-primary font-semibold">{getInitials(user?.user?.first_name + " " + user?.user?.last_name)}</div> */}
        <div className='flex items-end flex-col'>
          <h4 className="font-semibold text-[#344054]">Adelakun Oluwatobiloba</h4>
          <h4 className=" text-sm text-[#667085]">Superadmin</h4>
        </div>
        <div className="rounded-full h-10 w-10 satoshi grid place-items-center text-white text-lg bg-[#027A48] font-semibold">OA</div>
      </div>
    </nav>
  );
};

export default AdminTopNav;