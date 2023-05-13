import React, { useEffect, useRef, useState } from 'react';
import { logOutAction } from '../redux/actions/dashboardActions';
import { Modalstyle } from '../useStyles';
import useOutsideClick from './useClickOutside';
import LogoutImg from "@assets/images/logout.svg"


const LogoutPopup = () => {
  const [signoutTime] = useState(360000);
  const [warningTime] = useState(300000);
  let warnTimeout;
  let logoutTimeout;


  const warn = () => {
    setIsOpen(true)
  };
  const logout = () => {
    logOutAction()
  }
  const setTimeouts = () => {
    warnTimeout = setTimeout(warn, warningTime);
    logoutTimeout = setTimeout(logout, signoutTime);
  };

  const clearTimeouts = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
  };

  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef();

  useOutsideClick(ref, () => {
    setIsOpen(false)
  });

  useEffect(() => {

    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
    };

    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }

    setTimeouts();
    return () => {
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    }
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      {isOpen &&
        <Modalstyle className="grid place-items-center p-4">
          <div ref={ref} className="text-center max-w-lg rounded py-10 px-4 w-full bg-white">
            <img src={LogoutImg} className="mx-auto mb-5 max-w-[150px] w-full" alt="" />
            <h3 className="text-xl font-semibold mb-10">Are you still active on the app?</h3>
            <div className="flex justify-around flex-col md:flex-row gap-y-3">
              <button className='outlined' onClick={logOutAction}>No, log me out</button>
              <button onClick={() => setIsOpen(false)}>Yes, I'm still here</button>
            </div>
          </div>
        </Modalstyle>
      }
    </div>
  )
}
export default LogoutPopup;