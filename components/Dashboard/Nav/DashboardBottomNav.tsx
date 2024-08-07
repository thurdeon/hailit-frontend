"use client";
// next
import Link from "next/link";
import { usePathname } from "next/navigation";
//ui + icons
import { Button } from "@/components/ui/button";
import { ActiveSection } from "@/lib/store/slice/dashboardSlice";
import { IconType } from "react-icons/lib";
import { LuUsers } from "react-icons/lu";
import { MdInsertChartOutlined } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { TbLayoutDashboard, TbUser } from "react-icons/tb";

export function DashboardBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 top-auto z-50 flex justify-center items-center p-4 h-20 shadow-2xl gap-3 md:gap-5 w-full bg-white dark:bg-secondary-dark font-medium">
      <DashboardBottomNavElement
        navTitle="Orders"
        Icon={RiFileListLine}
        url="orders"
      />

      <DashboardBottomNavElement
        navTitle="Users"
        Icon={LuUsers}
        url="users"
      />

      <DashboardBottomNavElement
        navTitle="Overview"
        Icon={TbLayoutDashboard}
        url="/"
      />

      <DashboardBottomNavElement
        navTitle="Analytics"
        Icon={MdInsertChartOutlined}
        url="analytics"
      />

      <DashboardBottomNavElement
        navTitle="Profile"
        Icon={TbUser}
        url="profile"
      />
    </nav>
  );
}

const DashboardBottomNavElement = ({
  navTitle,
  Icon,
  url,
}: {
  navTitle: ActiveSection;
  Icon: IconType;
  url: string;
}) => {
  const path = usePathname();
  
  return (
    <div className="flex flex-col justify-center items-center ">
      <Link href={`/dashboard/${url}`} className="w-full">
        <Button
          
          variant={
            path.startsWith(`/dashboard/${url}`) ||
            (navTitle === "Overview" && path === "/dashboard")
              ? "default"
              : "secondary"
          }
          className="border-none"
        >
          <Icon className="h-5 w-5" />
        </Button>
      </Link>
      <p
        className={`text-[12px] ${
          path.startsWith(`/dashboard/${url}`) ||
          (navTitle === "Overview" && path === "/dashboard")
            ? "text-primary-shade dark:text-white"
            : ""
        }`}
      >
        {navTitle}
      </p>
    </div>
  );
};
