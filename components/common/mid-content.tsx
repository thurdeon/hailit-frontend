//previous dark background: bg-[#242323]
export default function MidContent({children, className}:{children: any, className: string}) {
    return(
        <div className={`flex flex-col justify-start items-center gap-3 bg-white dark:bg-[#121212] w-full -mt-20 rounded-tr-[50px] ${className}`}>
            {children}
        </div>
    );
}