import { useState } from "react";
import Link from "next/link";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { AiOutlineCreditCard } from "react-icons/ai";
import { MdOutlineSpaceDashboard, MdSettingsPower } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { useRouter } from "next/router";
import { logOutAction } from "@/utils/auth";
// import FullPageLoader from "../FullPageLoader";
// import { matchPath } from 'react-router'

const Sidebar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const router = useRouter()

  const ListArray = [
    {
      Icon: MdOutlineSpaceDashboard,
      title: "Dashboard",
      route: "/admin",
    },
    {
      Icon: MdOutlineSpaceDashboard,
      title: "Enroll Student",
      route: "/admin/student/create",
    },
    {
      Icon: AiOutlineCreditCard,
      title: "New students",
      route: "/admin/new-students",
    },
    {
      Icon: BiTransfer,
      title: "Returning Students",
      route: "/admin/returning-students",
    }
  ];

  const [showLoader, setShowLoader] = useState(false);

  const logOut = () => {
    setShowLoader(true);
    logOutAction();
  };

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="xl"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader className="pt-8 pb-5  px-5">
          {/* <Link href="/" className="items-center md:w-full md:max-w-[154px] gap-4">
            <img src="/logo-white.svg" alt="" className="w-12 lg:w-16" />
          </Link> */}
          <div className=''>
            <div className='items-center gap-2 '>
              <img src='/img/logo.svg' alt="" />
              <p className='uppercase text-[#fff] leading-none font-bold'>
                University <br /> of Lagos
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <Menu iconShape="round" popperArrow={true} className="">
            {ListArray.map((item) =>
              <MenuItem
                active={router.pathname === item.route}
                key={item.title}
                onClick={() => handleToggleSidebar(false)}
                icon={<item.Icon />}
              >
                {item.title}
                <Link href={item.route ? item.route : "#"} />
              </MenuItem>
            )}
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            <MenuItem onClick={logOut} icon={<MdSettingsPower />}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>

    </>
  );
};

export default Sidebar;