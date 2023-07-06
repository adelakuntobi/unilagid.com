import cogoToast from 'cogo-toast';
import { TbAlertCircle } from "react-icons/tb"
import { RiCheckboxCircleFill } from "react-icons/ri"

export const options = {
  hideAfter: 7,
  button: true,
  // position: top-left,
  heading: '',
  bar: { size: '1px' }
}


export default function cogotoast(message:any, type:string) {
  switch (type) {
    case "success":
      cogoToast.success(
        message,
        {
          ...options,
          renderIcon: RiCheckboxCircleFill,
        }
      );
      break;
    case "error":
      cogoToast.error(
        message,
        {
          ...options,
          renderIcon: TbAlertCircle,
        }
      );
      break;

    default:
      cogoToast.warn(
        message,
        {
          ...options,
        }
      );
      break;


  }
}
