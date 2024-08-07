"use client";
//ui + icons
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";

//main components
import FirstStage from "@/components/Onboarding/FirstStage";
import LastStage from "@/components/Onboarding/LastStage";
import OnboardingStagesCheck from "@/components/Onboarding/OnboardingStagesCheck";
import SecondStage from "@/components/Onboarding/SecondStage";
import ErrorComponent from "../Shared/ErrorComponent";

//hook
import { useOnboarding } from "@/components/Onboarding/hooks/useOnboarding";

export default function OnboardingStages() {
  

  
  const {
    authenticated,
    chosenRole,
    stageOne,
    stageTwo,
    stageThree,
    loading,
    onboard,
    userOnboard,
    handleOnboardStage,
  } = useOnboarding();
    
  
  return (
    <>
      {(!authenticated || (userOnboard && !stageThree && !stageOne && !stageTwo) ) && (
        <ErrorComponent errorCode={404} errorMessage="Page Not Found" url="/" />
      )}
      {authenticated && !onboard && (
        <main className="flex flex-col  items-center w-full  p-5 md:justify-center bg-slate-50 mb-20 dark:bg-primary-dark">
          {/* Onboarding stages 1 - 3 starts here */}
          <div className="flex items-center justify-center md:w-1/2">
            <OnboardingStagesCheck />
          </div>

          {/* Onboarding stage 1 */}
          {stageOne && !stageTwo && !stageThree && (
            <>
              <div className="grid  grid-cols-1 w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2">
                <FirstStage />
                
                  <Button
                    className="w-full bottom-0 row-start-6 "
                    onClick={() => {
                      handleOnboardStage("Second");
                    }}
                    disabled = {!chosenRole || loading}
                  >
                    {loading ? <Loader /> : "Next"}
                  </Button>
                
              </div>
            </>
          )}
          {/* Onboarding stage 2 */}
          {stageOne && stageTwo && !stageThree && (
            <>
              <SecondStage />

              <div className="flex md:w-1/3 w-full gap-4 px-4 md:p-0 ">
                <Button
                  variant={"outline"}
                  className="w-1/3"
                  
                  onClick={() => {
                    handleOnboardStage("First");
                  }}
                >
                  <FiArrowLeft />
                </Button>
                
                 
                 <Button
                  className="w-full"
                  //connected to the customer profile update form
                  form="customerProfileUpdate"
                  type="submit"
                  disabled = {loading}
                  // onClick={handleLoading}
                >
                  {loading ? <Loader/> : 'Next'}
                </Button>
                 
                 
                
              </div>
            </>
          )}
          {/* Onboarding stage 3 */}
          {stageOne && stageTwo && stageThree && (
            <>
              <LastStage />

              <div className="w-full md:w-2/4 p-5 flex  items-center justify-center gap-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    handleOnboardStage("Complete");
                  }}
                >
                  {
                  chosenRole === "Rider" ? "Start Earning" :
                  'Send a Package'
                  }
                </Button>
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
}


