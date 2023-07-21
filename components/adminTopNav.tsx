// import Link from 'next/link';
// import { FiUser } from "react-icons/fi"

export const getInitials = (name) => {
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[1].substring(0, 1).toUpperCase();
  }
  return initials;
}


const AdminTopNav = ({ heading }) => {
  const fullName = sessionStorage.getItem("admin_name")
  const ID = sessionStorage.getItem("admin_id")

  return (
    <nav className=" max-w-[1520px] mx-auto pt-6 pb-7 px-8 items-center justify-between border-b border-[#EAECF0]">
      <h2 className='text-[#101828] font-bold text-3xl'>{heading}</h2>

      <div className="items-center gap-2">
        {/* <div className="rounded-full h-9 w-9 satoshi grid place-items-center text-white bg-primary font-semibold">{getInitials(user?.user?.first_name + " " + user?.user?.last_name)}</div> */}
        <div className='flex items-end flex-col'>
          <h4 className="font-semibold text-[#344054]">{fullName}</h4>
          <h4 className=" text-sm text-[#667085]">{ID}</h4>
        </div>
        <div className="rounded-full h-10 w-10 satoshi grid place-items-center text-white text-lg bg-[#027A48] font-semibold">{getInitials(fullName)}</div>
      </div>
    </nav>
  );
};

export default AdminTopNav;