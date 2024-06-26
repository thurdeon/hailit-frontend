"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { LoaderCircle } from "lucide-react";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";

type Modal = "destructive" | "success";
export default function ModalCard({
  cancelFunc,
  confirmFunc,
  modalType,
  
  children
}: {
  modalType?: Modal;
  cancelFunc: () => void;
  confirmFunc: () => void;
  
  children?: React.ReactNode 
}) {
  const [loading, setLoading] = useState<boolean>();

  return (
    <div className="">
      
              <div className="h-1/3">
          <div className="  gap-2 w-full">
            <div className="">{children}</div>
            <div className="mt-4 w-full flex flex-col gap-2 items-center justify-center">
              <Button
                variant={modalType === "success" ? "default" : "destructive"}
                className="animate-in slide-in-from-bottom delay-50 w-full"
                onClick={confirmFunc}
                disabled={loading}
              >
                {loading ? <Loader /> : "Confirm"}
              </Button>
              <DialogClose asChild>

              <Button
                variant={"outline"}
                className="animate-in slide-in-from-bottom delay-75 w-full"
                onClick={cancelFunc}
              >
                Cancel
              </Button>
              </DialogClose>
            </div>
          </div>
        </div>
    </div>
  );
}
