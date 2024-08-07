import React from "react";

export default function TopSectionContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {

  
  return (
    <div
      className={`flex flex-col items-start justify-center gap-2 w-full h-80 bg-gradient-to-r from-primary-shade to-primary-color  p-4 text-white dark:bg-gradient-to-r dark:from-[#1e1e1e] dark:to-[#1e1e1e] md:items-center ${className} `}
    >
      {children}
    </div>
  );
}
