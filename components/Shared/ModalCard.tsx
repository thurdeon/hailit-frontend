"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { DialogClose } from "../ui/dialog";
import Loader from "./Loader";

type Modal = "destructive" | "success";

export default function ModalCard({
  cancelFunc,
  confirmFunc,
  modalType,
  loading,
  error,
  isSuccess,
  children
}: {
  modalType?: Modal,
  cancelFunc?: () => void,
  confirmFunc: (details?:any) => void,
  loading?: boolean,
  error?: any, 
  isSuccess?: boolean,
  children?: React.ReactNode 
}) {
  

  return (
    <div className="">
      
              <div className="h-1/3">
          <div className="  gap-2 w-full">
            <div className="">{children}</div>
            {
              !error && !isSuccess &&
              <div className="mt-4 w-full flex flex-col gap-2 items-center justify-center">
              <Button
                variant={modalType === "success" ? "default" : "destructive"}
                className="animate-in slide-in-from-bottom delay-50 w-full"
                onClick={confirmFunc}
                disabled={loading}
              >
                {loading ? <Loader color="text-white" /> : "Confirm"}
              </Button>
              <DialogClose asChild>

              <Button
                variant={"empty"}
                className=" w-full border dark:bg-secondary-dark hover:bg-slate-100 bg-white border-slate-300 dark:border-opacity-20"
                onClick={cancelFunc}
              >
                Cancel
              </Button>
              </DialogClose>
            </div>
            }
            {
              error && 
              <div className="mt-4 w-full flex flex-col gap-2 items-center justify-center">
              <Button
                variant={modalType === "success" ? "default" : "destructive"}
                className="animate-in slide-in-from-bottom delay-50 w-full"
                onClick={confirmFunc}
                disabled={loading}
              >
                {loading ? <Loader /> : "Try Again"}
              </Button>
              <DialogClose asChild>

              <Button
                variant={"empty"}
                className=" w-full border dark:bg-secondary-dark hover:bg-slate-100 bg-white border-slate-300 dark:border-opacity-20"
                onClick={cancelFunc}
              >
                Cancel
              </Button>
              </DialogClose>
            </div>
            }
            
          </div>
        </div>
    </div>
  );
}
