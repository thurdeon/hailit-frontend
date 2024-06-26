import Lottie from "lottie-react";
import emptyAnimation from "@/public/animations/empty-animation.json";

export default function NoData ({noDataText, textClassName} : {noDataText:string, textClassName?:string}) {
    return (
        <main className="w-full flex flex-col gap-1 items-center justify-center -mt-5">
            <div className="w-1/2">

            <Lottie animationData={emptyAnimation}/>
            </div>
            <p className={textClassName}>{noDataText}</p>
        </main>
    )
}