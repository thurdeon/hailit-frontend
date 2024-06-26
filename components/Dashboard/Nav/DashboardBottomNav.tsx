"use client";
// next
import { usePathname } from "next/navigation";

//ui + icons
import { LuUsers } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { TbRoute, TbUser, TbLayoutDashboard } from "react-icons/tb";
import { RiFileListLine } from "react-icons/ri";
import { ActiveSection } from "@/lib/store/slice/dashboardSlice";
export function DashboardBottomNav({
  activeSection,
  onClickFunc,
}: {
  activeSection: ActiveSection;
  onClickFunc: (section: ActiveSection) => void;
}) {
  const path = usePathname();

  const lightThemeClass =
    "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0";
  const darkThemeClass =
    "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100";
  const textClass = "text-[12px] ";
  const divClass = "flex flex-col justify-center items-center ";

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 top-auto z-50 flex justify-center items-center p-4 h-20 shadow-2xl gap-3 md:gap-5 w-full bg-white dark:bg-secondary-dark font-medium">
      <div className={divClass}>
        <Button
          onClick={() => onClickFunc("Orders")}
          variant={activeSection === "Orders" ? "default" : "secondary"}
          className="border-none "
        >
          <RiFileListLine className={lightThemeClass} />
          <RiFileListLine className={darkThemeClass} />
        </Button>
        <p
          className={`${textClass} ${
            path === "/" ? "text-primary-shade dark:text-white" : ""
          }`}
        >
          Orders
        </p>
      </div>

      <div className={divClass}>
        <Button
          onClick={() => onClickFunc("Users")}
          variant={activeSection === "Users" ? "default" : "secondary"}
          className="border-none "
        >
          <LuUsers className={lightThemeClass} />
          <LuUsers className={darkThemeClass} />
        </Button>
        <p
          className={`${textClass} ${
            activeSection === "Users" ? "text-primary-shade dark:text-white" : ""
          }`}
        >
          Users
        </p>
      </div>

      <div className={divClass}>
        <Button
          onClick={() => onClickFunc("Overview")}
          variant={activeSection === "Overview" ? "default" : "secondary"}
          className="border-none"
        >
          <TbLayoutDashboard className={lightThemeClass} />
          <TbLayoutDashboard className={darkThemeClass} />
        </Button>
        <p
          className={`${textClass} ${
            activeSection === "Overview" ? "text-primary-shade dark:text-white" : ""
          }`}
        >
          Overview
        </p>
      </div>

      <div className={divClass}>
        <Button
          onClick={() => onClickFunc("Track Order")}
          variant={activeSection === "Track Order" ? "default" : "secondary"}
          className="border-none"
        >
          <TbRoute className={lightThemeClass} />
          <TbRoute className={darkThemeClass} />
        </Button>
        <p
          className={`${textClass} ${
            activeSection === "Track Order"
              ? "text-primary-shade dark:text-white"
              : ""
          }`}
        >
          Track
        </p>
      </div>

      <div className={divClass}>
        <Button
          onClick={() => onClickFunc("Profile")}
          variant={activeSection === "Profile" ? "default" : "secondary"}
          className="border-none"
        >
          <TbUser className={lightThemeClass} />
          <TbUser className={darkThemeClass} />
        </Button>
        <p
          className={`${textClass} ${
            activeSection === "Profile"
              ? "text-primary-shade dark:text-white"
              : ""
          }`}
        >
          Profile
        </p>
      </div>
    </nav>
  );
}
