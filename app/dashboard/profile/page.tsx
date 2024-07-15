"use client"
import EditCustomerProfile from "@/components/Form/EditCustomerProfile"
import { Button } from "@/components/ui/button"
import Loader from "@/components/Shared/Loader"
import { useCustomerProfile } from "@/components/Form/hooks/useCustomerProfile"
import withAdminCheck from "@/components/Dashboard/withAdminCheck"

const Profile = ()=> {
    
  const {
    isSuccess,
    isLoading: formLoading,
    handleSignOut,
  } = useCustomerProfile();
    return (
        <section className="flex flex-col justify-center items-center lg:items-start lg:justify-start  gap-4">
          <div className="max-w-sm w-full">

          <EditCustomerProfile />
          </div>
            <Button
              type="submit"
              className="max-w-sm w-full h-14"
              form="customerProfileUpdate"
              variant={"outline"}
            >
              {formLoading ? <Loader /> : isSuccess ? "Saved" : "Save"}
            </Button>
            <span className="max-w-sm w-full lg:hidden flex items-center justify-center  ">
              <p>OR</p>
            </span>
            <Button
              className="max-w-sm w-full h-14 lg:hidden"
              onClick={handleSignOut}
            >
              Logout
            </Button>
            <div className="flex flex-col gap-2 w-full items-start justify-start">
            </div>
            {/* Form submit button placed here because the form is used at different places with different button position */}
          </section>
    )
}

export default withAdminCheck(Profile);