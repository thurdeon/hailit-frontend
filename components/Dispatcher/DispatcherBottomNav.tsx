import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuHome, LuUser } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";
import { darkThemeClass, divClass, lightThemeClass, textClass } from "../Nav/BottomNavBar";
import { Button } from "../ui/button";

export default function DispatcherBottomNav () {
    const path = usePathname();
    return(
        <>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 top-auto z-50 flex justify-center items-center p-4 h-20 shadow-2xl gap-10 w-full bg-white dark:bg-secondary-dark font-medium">
      <Link href="/dispatcher">
        <div className={divClass}>
          <Button
            variant={path === "/dispatcher" ? "default" : "secondary"}
            className="border-none "
          >
            <LuHome className={lightThemeClass} />
            <LuHome className={darkThemeClass} />
          </Button>
          <p
            className={`${textClass} ${
              path === "/" ? "text-primary-shade dark:text-white" : ""
            }`}
          >
            Home
          </p>
        </div>
      </Link>

      <Link href="/dispatcher/trips">
        <div className={divClass}>
          <Button
            variant={path.startsWith("/dispatcher/trip") ? "default" : "secondary"}
            className="border-none"
          >
            <TbPackages className={lightThemeClass} />
            <TbPackages className={darkThemeClass} />
          </Button>
          <p
            className={`${textClass} ${
              path.startsWith("/dispatcher/trip") ? "text-primary-shade dark:text-white" : ""
            }`}
          >
            Deliveries
          </p>
        </div>
      </Link>

      <Link href="/dispatcher/profile">
        
        <div className={divClass}>
          <Button
            variant={path.startsWith("/dispatcher/profile") ? "default" : "secondary"}
            className="border-none"
          >
            <LuUser className={lightThemeClass} />
            <LuUser className={darkThemeClass} />
          </Button>
          <p
            className={`${textClass} ${
              path.startsWith("/dispatcher/profile") ? "text-primary-shade dark:text-white" : ""
            }`}
          >
            Profile
          </p>
        </div>
      </Link>
    </nav>
            </>
    )
}