"use client";

import Loading from "@/components/Loading";
import Error from "@/components/Error";
import SearchBar from "@/components/SearchBar";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { Path } from "@/context/Path";

export default function Event() {
  const { path, setPath } = useContext(Path);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
    fetcher
  );
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pt-[71px] pb-10">
        <SearchBar />
        <div
          id="event-primary-container"
          className="flex flex-col w-full pt-[100px] md:pt-[70px]"
        >
          <div
            id="event-secondary-container"
            className="flex flex-col space-y-10 md:space-y-0 overflow-x-hidden items-center w-full md:flex-row md:flex-wrap md:justify-center xl:px-20 2xl:px-40"
          >
            {data.events.map((event, index) => {
              let date = new Date(event.startDate);
              date = date.toLocaleDateString();
              return (
                <Link key={index} href={`/events/${event.id}`}>
                  <div
                    id="event-container"
                    className="flex flex-col border shadow-md w-[300px] h-[300px] rounded-lg md:mx-5 md:my-10"
                  >
                    <div className="relative w-full h-[200px] rounded-t-lg">
                      <Image
                        src={event.image}
                        className="object-cover object-center rounded-t-lg"
                        fill
                        alt="event image"
                      />
                    </div>
                    <div
                      className={`absolute text-sm ml-3 mt-2 font-bold font-quicksand py-1 px-3 rounded-md bg-opacity-80 ${
                        event.type === "Free"
                          ? "text-green-700"
                          : "text-slate-100"
                      } ${
                        event.type === "Free" ? "bg-green-400" : "bg-sky-400"
                      }`}
                    >
                      {event.type}
                    </div>
                    <div className="px-5 pt-3 font-quicksand font-bold">
                      {event.name}
                    </div>
                    <div className="font-quicksand px-5 text-sm truncate">
                      {event.description}
                    </div>
                    <div className="flex text-[13px] justify-between px-5 mt-4">
                      <div className="flex items-center space-x-1">
                        <div className="relative w-3 h-3">
                          <Image
                            src={"/event/location.png"}
                            fill
                            alt="location"
                          />
                        </div>
                        <div>{event.location}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative w-3 h-3">
                          <Image
                            src={"/event/calendar.png"}
                            fill
                            alt="calendar"
                          />
                        </div>
                        <div>{date}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
