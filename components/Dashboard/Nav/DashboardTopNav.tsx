"use client";
import type { CurrentTheme } from "@/app/profile/page";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



export default function DashboardTopNav () {
    const { theme, setTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>("system"); // Default theme

  //setting current theme. Not using useEffect result in hydration errors
  useEffect(() => {
    const preferredTheme: CurrentTheme =
      localStorage.getItem("theme") || systemTheme || theme;
    setCurrentTheme(preferredTheme);
  }, [currentTheme]);

  const handleThemeChange = () => {
    setCurrentTheme(theme === "dark" ? "light" : "dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const path = usePathname();

  const iconsAndTextDivClass =
    "flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md";
  const iconsAndTextSpanClass =
    "flex items-center justify-center gap-2 relative";

  const iconTextClass = "text-sm cursor-pointer ";

  const divClass = "flex flex-col justify-center items-center";

    return (
        <nav className={`flex  w-6/6 left-0 right-0 top-auto z-40 ${path.startsWith('/dashboard') ? 'justify-between': 'justify-center'}  items-center p-4 md:h-20 h-16 shadow-md gap-10 w-full bg-white dark:bg-primary-dark font-bold`}>

      
        <section className="hidden md:block w-full text-2xl ml-10 cursor-pointer" >
        <Link href={'/dashboard'}>
          <p>Hailit</p>
        </Link>
        
      </section>
      <div className={`#{iconsAndTextDivClass}  md:hidden`}>
          <span className={iconsAndTextSpanClass}>
          {/* <RiNotification3Line className="text-2xl"/> */}
      <p className="text-3xl md:hidden">Hailit</p>
          </span>
        </div>
      <section className="w-full">
      {/* <Input className="flex items-center justify-center border-2  border-black dark:border-white rounded-full md:w-full w-[200px] md:h-12 h-10 font-light "  placeholder="Enter Trip ID to search "/> */}

      </section>
      
      <section className="flex gap-2 justify-end items-center w-full ">
          <div className="hidden md:flex items-center  w-full  justify-end rounded-full h-12 gap-2">
                <div className="flex items-center justify-center border-none bg-black dark:bg-white dark:text-secondary-dark text-white rounded-full  md:h-12 md:w-12 sm:h-8 sm:w-8 -ml-1">
                  <p>J</p>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="font-bold text-md">
                      Administrator
                    </p>
                    <p className="font-bold text-[12px] opacity-50">
                      Administrator
                    </p>
                </div>
          </div>
          
          <div className={`#{iconsAndTextDivClass} hidden md:block`}>
          <span className={iconsAndTextSpanClass}>
          {/* <RiNotification3Line className="text-2xl"/> */}
          </span>
        </div>
        <div className={iconsAndTextDivClass} onClick={handleThemeChange}>
          <span className={iconsAndTextSpanClass}>
            <ThemeToggle />
          </span>
        </div>
      </section>
      </nav>
    )
}