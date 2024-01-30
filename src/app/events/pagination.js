"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const PaginationControls = ({ hasNextPage, hasPrevPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "9";
  console.log(page);
  return (
    <div className="flex space-x-3 items-center">
      <button
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/events?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <div className="relative w-8 h-8">
          {hasPrevPage ? (
            <Image
              className="hover:opacity-80"
              src={"/eventpreview/left-arrow.svg"}
              fill
              alt="right-arrow"
            />
          ) : (
            <Image
              className="opacity-50"
              src={"/eventpreview/left-arrow.svg"}
              fill
              alt="right-arrow"
            />
          )}
        </div>
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/events?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        <div className="relative w-8 h-8">
          {hasNextPage ? (
            <Image
              className="hover:opacity-80"
              src={"/eventpreview/right-arrow.svg"}
              fill
              alt="right-arrow"
            />
          ) : (
            <Image
              className="opacity-50"
              src={"/eventpreview/right-arrow.svg"}
              fill
              alt="right-arrow"
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default PaginationControls;
