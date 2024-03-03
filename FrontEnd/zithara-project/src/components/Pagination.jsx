import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ totalPages, currentPage, pageChangeHandler }) => {
  console.log("totalPages ->",totalPages);
  const [curPage, setCurPage] = useState(currentPage);

  const onPageSelectHandler = (page) => {
    setCurPage(page + 1);
    pageChangeHandler(page + 1);
  };

  const next = () => {
    if (curPage === totalPages) return;
    setCurPage(curPage + 1);
    pageChangeHandler(curPage + 1);
  };

  const prev = () => {
    if (curPage === totalPages) return;
    setCurPage(curPage - 1);
    pageChangeHandler(curPage - 1);
  };

  return (
    <div className="flex justify-center mb-10 items-center gap-8">
      <Button
        variant="text"
        className="flex hover:bg-gray-200 py-2 px-4 items-center gap-2 rounded-full"
        onClick={prev}
        disabled={curPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(totalPages).keys()].map((page) => {
          console.log(page + 1);
          return (
            <Button
              key={page}
              className={`hover:bg-gray-200 py-2 px-4 rounded-full ${
                curPage === page + 1 ? "bg-gray-600 text-white" : "text-black"
              }`}
              onClick={() => onPageSelectHandler(page)}
            >
              {page + 1}
            </Button>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex hover:bg-gray-200 py-2 px-4 items-center gap-2 rounded-full"
        onClick={next}
        disabled={curPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};
export default Pagination;
