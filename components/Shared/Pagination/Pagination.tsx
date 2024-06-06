"use client";
import React, { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";

type HandlePagination = (options: number)=> void;
export default function Pagination ({totalPages, setOffset, offset, limit}: {totalPages: number, setOffset: HandlePagination, offset:number, limit:number})  {
  const [currentPage, setCurrentPage] = useState<number>(1);
  

  const getPaginationButtons = () => {
    const pages = [];
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      return [...Array(totalPages).keys()].map((page) => page + 1);
    }
    
    if(!totalPages) {
      pages.push(...[Array(maxDisplayedPages).keys()].map(()=><Loader color="gray"/>))
    } else  if (currentPage <= 3) {
      pages.push(...[1, 2, 3, 4, 5, '...', totalPages]);
    } else if (currentPage >= totalPages - 2) {
      pages.push(...[1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
    } else {
      pages.push(...[1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setOffset(offset-limit)
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setOffset(limit+offset)
    }
  };

  const handlePageClick = (page: number | string | React.ReactNode) => {
      if (typeof page === "number"){
      setCurrentPage(page);
      setOffset(limit * page)
    }
  };

  const activeClass =
    "bg-primary-shade  hover:bg-primary-medium focus:bg-primary-shade cursor-pointer text-white";
  const inActiveClass =
    "dark:text-white hover:dark:bg-[#3333] bg-gray-100 hover:bg-primary-color hover:text-white dark:bg-secondary-dark";
  const generalClass =
    "cursor-pointer flex items-center justify-center text-center text-[13px] w-12 h-8 rounded-md text-black";

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant = {'empty'} onClick={handlePrevious} className={`${generalClass} dark:text-white`}>
        <GrFormPrevious />
      </Button>
      {
        
      }
      {
      getPaginationButtons().map((page, index) => (
        <Button variant = {'empty'}
          key={index}
          onClick={() => handlePageClick(page)}
          className={`${generalClass} ${currentPage === page ? activeClass : inActiveClass}`}
          disabled={page === '...'}
        >
          {page}
        </Button>
      ))}
      <Button variant = {'empty'} onClick={handleNext} className={`${generalClass} dark:text-white`}>
        <GrFormNext />
      </Button>
    </div>
  );
};
