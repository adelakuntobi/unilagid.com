// React
import { useCallback, useEffect, useRef, useState } from "react"

// Components
// import AuthLayout from '@components/AuthLayout'
// import CircleLoader from "@components/circleLoader"

// Styles
// import { FormInput, colourStyles } from "@src/useStyles"


// Dependencies
import Webcam from "react-webcam"
import { BsArrowLeft } from "react-icons/bs"
import { RiCheckFill } from "react-icons/ri"

// import apiClient from '../../../utils/req';
import { useMutation } from 'react-query';
// import { verification } from "../../../apiConstants"
import cogotoast from "./toaster"
import AuthLayout from "./NewLayout";
import Link from "next/link";


export const videoConstraints = {
  facingMode: "user",
  screenshotQuality: 1
};

export const removeInitialBase64 = (base64: string) => {
  return base64.replace(/^data:image\/jpeg;base64,/, "");
}

export const removeInitialPng = (base64: string) => {
  return base64.replace(/^data:image\/png;base64,/, "");
}

export function setWithExpiry(key: string, val: any, ttl: number) {
  const now = new Date()
  const item = {
    value: val,
    expiry: now.getTime() + ttl,
  }
  sessionStorage.setItem(key, JSON.stringify(item))
}

export default function Selfie(props: any) {
  const [idType, setIdType] = useState({ value: '', label: '' },)
  const [idError, setIdError] = useState("")
  const [callModal, setCallModal] = useState(false)
  const [consent, setConsent] = useState<any>(false)
  const [camera, setCamera] = useState<any>(false)
  const [takePicture, setTakePicture] = useState<any>(false)
  const webcamRef = useRef<Webcam>(null);

  const [imgSrc, setImgSrc] = useState<any | null>(null);
  const [step, setStep] = useState("")
  const [fields, setFields] = useState({ id_number: "" })
  const [maxLength, setMaxLength] = useState("")

  const [screenshotQuality, setScreenhotQuality] = useState(1)

  // useEffect(() => {
  //   if (imgSrc.length > 8) {
  //     setCamera(true)
  //   }
  // }, [imgSrc])


  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!idType || !fields || imgSrc.length < 8) {
      cogotoast("Please fill all the fields", "error");
    }
    else if (fields.id_number.length < 1 || !idType.value) {
      cogotoast("Please select valid means of identification", "error");
    }
    else if (fields.id_number.length !== 11) {
      setIdError("Incorrect ID Number")
    }
    else {
      setCallModal(true)
      // sendSelfieAndId()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // function convertToGrayScale(base64:string) {
  //   const myimage = new Image();
  //   myimage.src = base64;
  //   myimage.onload = function () {
  //     const cnv = document.createElement('canvas');
  //     cnv.width = myimage.width;
  //     cnv.height = myimage.height;
  //     const cnx = cnv?.getContext('2d');
  //     cnx.drawImage(myimage, 0, 0);
  //     const width = myimage.width;
  //     const height = myimage.height;
  //     const imgPixels = cnx.getImageData(0, 0, width, height);

  //     for (let y = 0; y < height; y++) {
  //       for (let x = 0; x < width; x++) {
  //         const i = (y * 4) * width + x * 4;
  //         const avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
  //         imgPixels.data[i] = avg;
  //         imgPixels.data[i + 1] = avg;
  //         imgPixels.data[i + 2] = avg;
  //       }
  //     }

  //     cnx.putImageData(imgPixels, 0, 0);
  //     setImgSrc(oldArray => [...oldArray, {
  //       "image": removeInitialPng(cnv.toDataURL()),
  //       "image_type_id": 6,
  //     }]);
  //     // return cnv.toDataURL();
  //   }
  // }

  // const { mutate: sendSelfieAndId } = useMutation(
  //   async () => {
  //     const user_id = sessionStorage.getItem("user_id")
  //     return await apiClient.post(verification, {
  //       user_id,
  //       id_type: idType.value,
  //       id_number: fields.id_number,
  //       selfie: imgSrc,
  //       first_name: fields.first_name,
  //       last_name: fields.last_name,
  //     })
  //   },
  //   {
  //     onSuccess: (response) => {
  //       setCallModal(false)
  //       setWithExpiry('step', 3, 600000)
  //       cogotoast("KYC submitted! We'll notify you once the review is complete (up to 24 hours)", "success");
  //       props.nextStep()
  //     },
  //     onError: (res) => {
  //       const err = res.response.data;
  //       setCallModal(false)
  //       switch (err.message) {
  //         case "The user id has already been taken.":
  //           props.nextStep()
  //           setWithExpiry('step', 3, 600000)
  //           break;
  //         case "The id number has already been taken.":
  //           setIdError("ID Number has been registered with Makecards.")
  //           break;

  //         default:
  //           cogotoast(err.message || "Error. Cannot proceed with verification", "error");
  //           break;
  //       }
  //     }
  //   }
  // );

  const capture = useCallback(() => {
    if (webcamRef.current) {
      setTakePicture(true)
      const imageSrc1 = webcamRef?.current?.getScreenshot();
      // console.log(imageSrc1)
      // setImgSrc((oldArray: any) => [...oldArray, {
      //   "image": removeInitialBase64(imageSrc1),
      //   "image_type_id": 2,
      // }]);
      setTimeout(() => {
        setCamera(true)
        setImgSrc(imageSrc1);
      }, 3000);

      // for (let x = 0; x < 8; x++) {
      //   setScreenhotQuality(0.6)
      //   setTimeout(function () {
      //     const imageSrc = webcamRef?.current?.getScreenshot();
      //     // convertToGrayScale(imageSrc)
      //     setImgSrc((oldArray: any) => [...oldArray, {
      //       "image": removeInitialBase64(imageSrc1),
      //       "image_type_id": 2,
      //     }]);
      //   }, x * 400, x);
      // }
    }
  }, [])


  const retake = () => {
    setCamera(false)
    setTakePicture(false)
    setImgSrc([])
  }
  return (
    <AuthLayout>
      <div className="relative items-center justify-center gap-4 w-full">
        <div className={`rounded-md bg-white py-6 md:max-w-lg shadow-lg px-4 lg:px-8 selfie-card ${step === "" ? "block show " : "hide "}`}>
          <div className=''>
            <h2 className="font-bold text-xl lg:text-2xl mb-1">Verify your Identity</h2>
            <p className="">To proceed, please take a selfie</p>
            <img src="/img/selfie.svg" alt="" className='w-64 my-10 mx-auto' />

            <div className="cursor-pointer " onChange={() => setConsent(!consent)}>
              <input type="checkbox" name="" id="consent" className="w-3 h-3 mr-2 accent-primary" value={consent}
              />
              <label htmlFor="consent" className="cursor-pointer">I consent to the collection, use and disclosure of my personal data for identity verification and safety purposes.</label>
            </div>
            <button className="mt-3 !w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={!consent}
              onClick={() => setStep("selfie")}>Take a Selfie</button>
            <Link href="/dashboard" className="items-center gap-2 justify-center mt-5 text-primary cursor-pointer test-sm font-medium">
              <BsArrowLeft className='text-xl z-30 relative ' />
              Back
            </Link>
          </div>

        </div>
        {
          step === "selfie" &&
          <div className={`selfie-right bg-gray-50 md:max-w-lg w-full p-6 overflow-hidden rounded-md shadow-md ${step === "selfie" ? "show " : "hide "}`}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='absolute z-0 -left-10 -top-20 w-52 opacity-10'>
              <path fill="#1C9B88" d="M34.9,-39.1C42.8,-27.1,44.9,-13.6,47.5,2.6C50.2,18.8,53.3,37.6,45.5,50.6C37.6,63.6,18.8,70.8,-0.7,71.5C-20.3,72.3,-40.5,66.5,-57,53.5C-73.4,40.5,-85.9,20.3,-82.6,3.3C-79.3,-13.6,-60,-27.2,-43.6,-39.2C-27.2,-51.2,-13.6,-61.6,0,-61.5C13.6,-61.5,27.1,-51.1,34.9,-39.1Z" transform="translate(100 100)" />
            </svg>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='absolute z-0 -right-14 -bottom-20 w-52 opacity-10'>
              <path fill="#1C9B88" d="M33.7,-28.9C44.9,-22.4,56.1,-11.2,57.2,1C58.2,13.3,49.1,26.6,37.8,33.2C26.6,39.8,13.3,39.7,2.1,37.6C-9.2,35.6,-18.4,31.6,-27,25C-35.6,18.4,-43.6,9.2,-50.5,-6.9C-57.4,-22.9,-63.1,-45.9,-54.5,-52.4C-45.9,-58.9,-22.9,-49,-5.9,-43.1C11.2,-37.3,22.4,-35.5,33.7,-28.9Z" transform="translate(100 100)" />
            </svg>

            <h2 className="font-bold text-2xl mb-3">Liveliness verification</h2>
            <div className="relative mb-8">
              <div className="SelfieCheckAnimation_animate SelfieCheckAnimation_container ">
                <div className={`SelfieCheckAnimation_completedOverlay ${takePicture ? "show-text" : null}`}></div>
                {camera ?
                  <img src={`${imgSrc}`} alt="" />
                  :
                  <Webcam
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                    mirrored={true}
                    // screenshotQuality={1}
                    forceScreenshotSourceSize={true}
                    screenshotQuality={screenshotQuality}
                    className={`${!camera ? "block" : "hidden"}`}
                  />
                }

                <div className={`SelfieCheckAnimation_circle ${takePicture ? "start-camera" : ""}`}>
                  <svg width="634" height="634" viewBox="0 0 634 634" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M284.924 4.6416L295.795 108.072" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M252.449 9.70605L274.072 111.433" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M220.682 18.1367L252.819 117.047" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M189.97 29.8418L232.27 124.851" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M160.649 44.6934L212.649 134.76" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M133.042 62.5273L194.172 146.665" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M107.45 83.1504L177.04 160.437" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M84.1543 106.336L161.441 175.926" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M63.4092 131.829L147.547 192.959" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M45.4434 159.351L135.51 211.351" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M30.4521 188.6L125.461 230.9" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M18.5996 219.256L117.509 251.394" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M10.0176 250.982L111.745 272.605" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M4.79883 283.433L108.229 294.304" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M3 316.25H107" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M4.6416 349.076L108.072 338.205" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M9.70605 381.551L111.433 359.928" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M18.1367 413.318L117.047 381.181" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M29.8418 444.03L124.851 401.73" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M44.6934 473.351L134.76 421.351" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M62.5273 500.958L146.665 439.828" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M83.1504 526.55L160.437 456.96" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M106.336 549.846L175.926 472.559" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M131.829 570.591L192.959 486.453" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M159.351 588.557L211.351 498.49" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M188.6 603.548L230.9 508.539" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M219.256 615.4L251.394 516.491" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M250.982 623.982L272.605 522.255" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M283.433 629.201L294.304 525.771" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M316.25 631V527" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M349.076 629.358L338.205 525.928" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M381.551 624.294L359.928 522.567" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M413.318 615.863L381.181 516.953" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M444.03 604.158L401.73 509.149" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M473.351 589.307L421.351 499.24" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M500.958 571.473L439.828 487.335" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M526.55 550.85L456.96 473.563" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M549.846 527.664L472.559 458.074" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M570.591 502.171L486.453 441.041" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M588.557 474.649L498.49 422.649" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M603.548 445.4L508.539 403.1" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M615.4 414.744L516.491 382.606" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M623.982 383.018L522.255 361.395" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M629.201 350.567L525.771 339.696" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M631 317.75H527" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M629.358 284.924L525.928 295.795" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M624.294 252.449L522.567 274.072" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M615.863 220.682L516.953 252.819" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M604.158 189.97L509.149 232.27" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M589.307 160.649L499.24 212.649" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M571.473 133.042L487.335 194.172" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M550.85 107.45L473.563 177.04" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M527.664 84.1543L458.074 161.441" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M502.171 63.4092L441.041 147.547" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M474.649 45.4434L422.649 135.51" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M445.4 30.4521L403.1 125.461" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round">
                    </path>
                    <path d="M414.744 18.5996L382.606 117.509" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M383.018 10.0176L361.395 111.745" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M350.567 4.79883L339.696 108.229" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                    <path d="M317.75 3V107" stroke="#C9CDD3" strokeWidth="6" strokeLinecap="round"></path>
                  </svg>
                </div>

                {
                  !camera &&
                  <div className="SelfieCheckAnimation_textWrapper">
                    <div id="SelfieCheckAnimation_text1" className={`SelfieCheckAnimation_textContainer  ${takePicture ? "show-text" : null}`}>
                      <svg width="14" height="14" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.33594 9.23438V10.6196C7.33594 10.9447 7.59969 11.2085 7.92481 11.2085C8.24993 11.2085 8.51368 10.9447 8.51368 10.6196V9.23438C8.51368 8.90926 8.24993 8.64551 7.92481 8.64551C7.59969 8.64551 7.33594 8.90926 7.33594 9.23438Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M17.6253 11.2085C17.9507 11.2085 18.2141 10.9447 18.2141 10.6196V9.23438C18.2141 8.90926 17.9507 8.64551 17.6253 8.64551C17.3001 8.64551 17.0371 8.90926 17.0371 9.23438V10.6196C17.0371 10.9447 17.3001 11.2085 17.6253 11.2085Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M16.9302 16.7627C16.7589 16.5571 16.4531 16.5286 16.2475 16.6999C14.1579 18.4366 11.1248 18.4366 9.03525 16.6999C8.82959 16.5286 8.52346 16.5574 8.3525 16.7627C8.18117 16.9688 8.20893 17.2749 8.41533 17.4462C9.63947 18.4636 11.1405 18.9721 12.6415 18.9721C14.1422 18.9721 15.6436 18.4636 16.8678 17.4462C17.0734 17.2749 17.1016 16.9688 16.9302 16.7627Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M13.3303 9.72342V14.0423C13.3303 14.3505 13.0848 14.6007 12.7823 14.6007C12.4799 14.6007 12.2344 14.3505 12.2344 14.0423V9.72342C12.2344 9.41525 12.4799 9.16504 12.7823 9.16504C13.0848 9.16504 13.3303 9.41525 13.3303 9.72342Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M18.167 24.6902C18.167 25.1369 18.5304 25.5003 18.9771 25.5003C22.0284 25.5003 24.5003 23.0284 24.5003 19.9771C24.5003 19.5304 24.1369 19.167 23.6902 19.167C23.2436 19.167 22.8802 19.5304 22.8802 19.9771C22.8802 22.135 21.135 23.8802 18.9771 23.8802C18.5304 23.8802 18.167 24.2436 18.167 24.6902Z"
                          fill="black" stroke="black"></path>
                        <path
                          d="M0.5 19.9771C0.5 23.0284 2.97192 25.5003 6.02326 25.5003C6.46994 25.5003 6.83333 25.1369 6.83333 24.6902C6.83333 24.2436 6.46994 23.8802 6.02326 23.8802C3.86529 23.8802 2.12016 22.135 2.12016 19.9771C2.12016 19.5304 1.75676 19.167 1.31008 19.167C0.863393 19.167 0.5 19.5304 0.5 19.9771Z"
                          fill="black" stroke="black"></path>
                        <path
                          d="M0.5 6.02326C0.5 6.46994 0.863392 6.83333 1.31008 6.83333C1.75676 6.83333 2.12016 6.46994 2.12016 6.02326C2.12016 3.86529 3.86529 2.12016 6.02326 2.12016C6.46994 2.12016 6.83333 1.75676 6.83333 1.31008C6.83333 0.863392 6.46994 0.5 6.02326 0.5C2.97192 0.5 0.5 2.97192 0.5 6.02326Z"
                          fill="black" stroke="black"></path>
                        <path
                          d="M22.8802 6.02326C22.8802 6.46994 23.2436 6.83333 23.6902 6.83333C24.1369 6.83333 24.5003 6.46994 24.5003 6.02326C24.5003 2.97192 22.0284 0.5 18.9771 0.5C18.5304 0.5 18.167 0.863393 18.167 1.31008C18.167 1.75676 18.5304 2.12016 18.9771 2.12016C21.135 2.12016 22.8802 3.86529 22.8802 6.02326Z"
                          fill="black" stroke="black"></path>
                      </svg><span> Align your head to fit with the frame</span>
                    </div>
                    <div id="SelfieCheckAnimation_text2" className={`SelfieCheckAnimation_textContainer ${takePicture ? "show-text" : null}`}>
                      <svg width="13" height="13" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.99">
                          <path
                            d="M2 14.4545C2 20.9897 7.34655 26.3363 13.8817 26.3363C20.4169 26.3363 25.7635 20.9897 25.7635 14.4545V13.8817C25.7635 7.34655 20.4169 2 13.8817 2C7.34655 2 2 7.34655 2 13.8817V14.4545Z"
                            stroke="black" strokeWidth="2.21239" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                        <path
                          d="M8.33594 10.8545V12.2397C8.33594 12.5649 8.59969 12.8286 8.92481 12.8286C9.24993 12.8286 9.51368 12.5649 9.51368 12.2397V10.8545C9.51368 10.5294 9.24993 10.2656 8.92481 10.2656C8.59969 10.2656 8.33594 10.5294 8.33594 10.8545Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M18.6253 12.8286C18.9507 12.8286 19.2141 12.5649 19.2141 12.2397V10.8545C19.2141 10.5294 18.9507 10.2656 18.6253 10.2656C18.3001 10.2656 18.0371 10.5294 18.0371 10.8545V12.2397C18.0371 12.5649 18.3001 12.8286 18.6253 12.8286Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M17.9293 18.3819C17.7579 18.1762 17.4522 18.1477 17.2465 18.3191C15.157 20.0557 12.1238 20.0557 10.0343 18.3191C9.82861 18.1477 9.52248 18.1766 9.35152 18.3819C9.18019 18.5879 9.20796 18.894 9.41435 19.0654C10.6385 20.0828 12.1395 20.5913 13.6406 20.5913C15.1412 20.5913 16.6427 20.0828 17.8668 19.0654C18.0725 18.894 18.1006 18.5879 17.9293 18.3819Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                        <path
                          d="M14.3303 11.3426V15.6614C14.3303 15.9696 14.0848 16.2198 13.7823 16.2198C13.4799 16.2198 13.2344 15.9696 13.2344 15.6614V11.3426C13.2344 11.0344 13.4799 10.7842 13.7823 10.7842C14.0848 10.7842 14.3303 11.0344 14.3303 11.3426Z"
                          fill="black" stroke="black" strokeWidth="0.221239"></path>
                      </svg>
                      <span>Smile</span>
                    </div>
                    <div id="SelfieCheckAnimation_text3" className={`SelfieCheckAnimation_textContainer ${takePicture ? "show-text" : null}`}>
                      Thanks, please wait</div>
                    <div id="SelfieCheckAnimation_text4" className={`SelfieCheckAnimation_textContainer ${takePicture ? "show-text" : null}`}>
                      <svg width="12"
                        height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.04784 8.17284C1.56084 7.65984 2.39784 7.65984 2.88384 8.17284L7.71684 13.0598C8.22984 13.5728 8.22984 14.4098 7.71684 14.8958C7.20384 15.4088 6.36684 15.4088 5.88084 14.8958L1.04784 10.0358C0.534836 9.52283 0.534836 8.68584 1.04784 8.17284Z"
                          fill="#1C9B88"></path>
                        <path
                          d="M16.3035 0.991141C16.8975 1.39614 17.0325 2.23314 16.6275 2.80014L8.14946 14.9231C7.74446 15.5171 6.90745 15.6521 6.34045 15.2471C5.74645 14.8421 5.61145 14.0051 6.01645 13.4381L14.5215 1.31514C14.8995 0.721141 15.7365 0.559141 16.3035 0.991141Z"
                          fill="#1C9B88"></path>
                      </svg>
                      <span>Selfie was registered successfully</span>
                    </div>
                  </div>
                }

              </div>
              {
                camera && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  <p className="bg-[#F4F4FC] text-primary font-medium rounded-full p-4 h-11 justify-center w-full items-center gap-2">
                    <RiCheckFill className="text-2xl" />
                    Selfie Registered</p>
                  <button className=" w-full bg-white text-primary font-medium h-11"
                    onClick={retake}>Retake</button>
                </div>
              }
            </div>

            {
              !camera ?
                <button disabled={takePicture} className="w-full mt-12 py-3 transform"
                  onClick={capture}>Take Picture</button> :
                <button className="w-full py-3 transform"
                  >Continue</button>
            }

          </div>
        }
      </div>
    </AuthLayout >
  )
}