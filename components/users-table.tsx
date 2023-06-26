import { convertDate } from '@/utils/reuseables';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
// import { convertDate, getInitials } from '../../utils';


const UsersTable = (props: any) => {
  const { type, data, goToUser } = props

  const dataToDisplay = {
    active: ["active_card", "balance_usd", "balance_local"],
    verified: ["active_card", "balance_usd", "balance_local"],
    inactive: ["balance_usd", "user_status"],
    registered: ["balance_usd", "user_status"],
    drop_offs: ["onboarding_status", "user_status"],
    blocked: ["balance_usd", "user_status"],
  }
  const checkForStage = (stage) => {
    switch (stage) {
      case 1:
        return "Phone Number"
      case 2:
        return "Selfie Verification"
      case 3:
        return "Create PIN"
      default:
        break;
    }
  }
  const checkForNames = (item) => {
    switch (item) {
      case "active_card":
        return "Cards"
      case "balance_usd":
        return "Dollar Balance"
      case "balance_local":
        return "Local Balance"
      case "user_status":
        return "Ver Status"
      default:
        break;
    }
  }

  const switchReturn = (item, array) => {
    switch (item) {
      case "active_card":
        return array.active_card
      case "balance_usd":
        return "$" + array.balance_usd
      case "balance_local":
        return array.balance_local
      case "user_status":
        return <>
          <span className={`text-[11px] rounded-full py-[4px] px-2 font-medium text-white tracking-tight
        ${array.user_status === "verified" ? "bg-primary" : "bg-red-500"}
       `}>
            {array.user_status === "verified" ? "Verified" : "Unverified"}
          </span></>
      case "onboarding_status":
        return checkForStage(array.onboarding_status)
      default:
        break;
    }
  }
  return (
    <table className='w-full'>
      <thead>
        <tr>
          <th className='!text-left'>User</th>
          <th className='!text-left'>Reference</th>
          <th>Phone number</th>
          {
            dataToDisplay.inactive.map((item, index) => {
              return (
                <th key={index}>{checkForNames(item)}</th>
              )
            })
          }
          <th>Date Created</th>
          <th><MdOutlineArrowForwardIos className="text text-[#9CA1A5] block ml-auto mr-0" /></th>
        </tr>
      </thead>
      <tbody>
        {
          data?.map((item, index) => {
            return (
              <tr key={index} onClick={() => goToUser(item.uuid)} className='cursor-pointer hover:bg-gray-50'>
                <td className='leading-3 !text-left'>
                  <div className="items-center gap-4">
                    {/* <div className="rounded-full h-9 w-9 satoshi grid place-items-center text-white font-semibold bg-primary"
                    >{getInitials(item.full_name || item?.name?.full_name || "*")}</div> */}
                    <div>
                      <p className="font-medium capitalize text-[#364a63] ">{item.full_name || item?.name?.full_name || "Unregistered"}</p>
                      <span className="text-xs lowercase text-[#8094ae]">{item.email}</span>
                    </div>
                  </div>
                </td>
                <td className='!text-left'>{"MKCDahdbsub82"}</td>
                {/* <td className='!text-left'>{item.user_id}</td> */}
                <td>+{item.country_code + " " + item.phone_number}</td>
                {
                  dataToDisplay?.[type].map((eachItem, index) => {
                    return (
                      <td key={index}>{switchReturn(eachItem, item)}</td>
                    )
                  })
                }
                <td>{convertDate(item.created_at)}</td>
                <td><MdOutlineArrowForwardIos className="text text-[#9CA1A5] block ml-auto mr-0" /></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

export default UsersTable;