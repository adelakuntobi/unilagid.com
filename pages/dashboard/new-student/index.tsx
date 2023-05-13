
import { useState } from "react";
import StepWizard from "react-step-wizard";
import EditInfo from "@/components/edit-info";
import Preview from "@/components/preview";
import ProgressNav from "@/components/progress-nav";
import Selfie from "@/components/selfie";

export const isDev = process.env.REACT_APP_ENVIRONMENT

export default function NewStudent() {
  const [state, updateState] = useState({
    form: {},
  });


  return (
    <>
      <img src="/img/bg.svg" className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      <StepWizard
        isHashEnabled={false}
        nav={<ProgressNav isOnboarding={true} />}
        // instance={setInstance}
        className="  flex-col min-h-screen relative flex justify-betwee"
      >
        <Selfie hashKey={"verification"} />
        <EditInfo hashKey={"edit"} />
        <Preview hashKey={"preview"} />
      </StepWizard>
    </>
  )
}
