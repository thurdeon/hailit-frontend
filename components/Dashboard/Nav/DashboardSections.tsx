import { ActiveSection } from "@/lib/store/slice/dashboardSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSections({
    children,
    dashMin,
    sectionName,
    activeSectionName,
    url,
    onClickFunc,
  }: {
    children: React.ReactNode;
    dashMin: boolean;
    sectionName: ActiveSection;
    activeSectionName?: ActiveSection;
    url:string
    onClickFunc: (section: ActiveSection) => void;
  }) {

    const fullUrl = `/dashboard/${url}`;
    
    const path = usePathname();
    return (
      <Link href={`/dashboard/${url}`}>
      <div
        onClick={() => onClickFunc(sectionName)}
        className={`flex h-8 p-2  items-center w-full hover:text-primary-color hover:bg-white rounded-md text-[12px] ${
          dashMin ? "justify-center transition-all duration-300" : "md:justify-between justify-center transition-all duration-300"
        }  cursor-pointer ${
          path.startsWith(fullUrl) || (activeSectionName === 'Overview') ? "bg-white text-primary-color" : ""
        }`}
        >
        <div className="flex items-center justify-center gap-2 transition-all duration-300 transform translate-x-[100%] md:translate-x-0">
          {children}
          {!dashMin && (
            <p className="hidden md:inline text-md font-bold transition-all duration-300 transform translate-x-[100%] md:translate-x-0"> {sectionName} </p>
            
          )}
        </div>
      </div>
          </Link>
    );
  }
  