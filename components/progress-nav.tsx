import { useEffect, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom'
import * as Pages from "@/utils/pageUrl"
import Logo from './Logo';
import Link from 'next/link';
import Head from 'next/head';


const ProgressNav = (props: any) => {
  const { isWhite } = props
  // const location = useLocation();
  const [isOnLogin, setIsOnLogin] = useState(false)
  const [width, setWidth] = useState<any>("");
  const isMobile = width <= 768;

  const List = [
    "Selfie Verification",
    "Basic Information",
    "Upload signature",
  ]
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    const isPreviousActive = props.currentStep < i;
    dots.push((
      <li
        key={`step-${i}`}
        className={`step ${(isActive || !isPreviousActive) ? "step-primary " : ''} ${!isActive ? "after:!w-0 after:!h-0" : '!text-black active-step'}`}
        onClick={(isActive || !isPreviousActive) ? (() => props.goToStep(i)) : undefined}
      >{isMobile ? (isActive && List[i - 1]) : List[i - 1]}</li>
    ));
  }


  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(width.innerWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  return (
    <>
      <Head>
        <title>{`Studentify`}</title>
        <link rel="shortcut icon" href="/img/logo.svg" type="image/x-icon" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="container  flex-wrap items-center justify-between pt-8 pb-2  lg:py-8 gap-y-6">
        <Logo />

        <div className="flex items-center justify-end gap-2 lg:order-2">

          <Link href={Pages.LOGIN}>
            <button className={`outlined px-8 md:px-14 font-medium !h-[38px] md:!h-[48px]  ${isWhite ? "!text-white !border-white" : null}`}>
              Logout </button>
          </Link>

        </div>
        {
          props.isOnboarding &&
          <ul className="w-full progress-steps lg:order-1 lg:w-auto lg:py-0">
            {dots}
          </ul>
        }
      </section>
    </>
  );
};

export default ProgressNav;