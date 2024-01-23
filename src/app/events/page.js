"use client";

import Loading from "@/components/Loading";
import Error from "@/components/Error";
import SearchBar from "@/components/SearchBar";
import useSWR from "swr";

export default function Event() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/events`,
    fetcher
  );
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pt-[72px]">
        <SearchBar />
        <div id="event-main-container" className="h-[1000px] pt-[60px]">
          <div id="event-row-container">
            {data.events.map((event, index) => {
              return <div key={index}>{event.name}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
