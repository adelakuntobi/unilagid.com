
import { useState } from "react";
import StepWizard from "react-step-wizard";
import EditInfo from "@/components/edit-info";
import Preview from "@/components/signature";
import ProgressNav from "@/components/progress-nav";
import Selfie from "@/components/selfie";
import withAuth from "@/services/withAuth";

export const isDev = process.env.REACT_APP_ENVIRONMENT

 function NewStudent() {
  const [state, updateState] = useState({
    form: {},
  });


  return (
    <>

      <img src="/img/bg.svg" className="fixed top-0 left-0 w-full h-full object-cover" alt="" />
      <StepWizard
        isHashEnabled={true}
        nav={<ProgressNav isOnboarding={true} />}
        // instance={setInstance}
        className="  flex-col min-h-screen relative flex justify-between"
      >
        <Selfie hashKey={"verification"} />
        <EditInfo hashKey={"edit"} />
        <Preview hashKey={"preview"} />
      </StepWizard>
    </>
  )
}
export default withAuth(NewStudent)