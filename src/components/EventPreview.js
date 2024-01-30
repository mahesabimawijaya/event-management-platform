"use client";

import useSWR from "swr";
import Error from "./Error";
import Loading from "./Loading";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Path } from "@/context/Path";

export default function EventPreview() {
  const { setPath } = useContext(Path);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: free,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/events/type/Free/limit/3`,
    fetcher
  );
  const {
    data: paid,
    error: errpaid,
    isLoading: islpaid,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/events/type/Paid/limit/3`,
    fetcher
  );
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  if (errpaid) return <Error />;
  if (islpaid) return <Loading />;
  return (
    <>
      <div id="event-preview" className="flex flex-col w-full h-auto">
        <div
          id="free-event-container"
          className="flex flex-col xl:px-20 pt-10 my-5"
        >
          <div className="text-2xl font-quicksand font-semibold text-center mb-5">
            Check Out Our Joyfull Free Event
          </div>
          <div
            id="free-event-preview-container"
            className="flex flex-col space-y-10 md:space-y-0 overflow-x-hidden items-center w-full lg:flex-row md:justify-end 2xl:justify-center 2xl:px-40"
          >
            {free.events.map((event, index) => {
              let date = new Date(event.startDate);
              date = date.toLocaleDateString();
              return (
                <Link key={index} href={`/events/${event.id}`}>
                  <div
                    id="event-container"
                    className="flex flex-col hover:bg-violet-700 hover:text-white duration-200 border shadow-md w-[300px] h-[300px] rounded-lg md:mx-5 md:my-10"
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
            <div className="flex flex-col items-center space-y-2 md:ml-10">
              <Link
                href={"/events"}
                onClick={() => {
                  setPath("/events/type/Free");
                }}
              >
                <div className="relative w-10 h-10 hover:scale-125 duration-200">
                  <Image
                    src={"/eventpreview/right-arrow.svg"}
                    fill
                    alt="right-arrow"
                  />
                </div>
              </Link>
              <div className="font-semibold">View More</div>
            </div>
          </div>
        </div>
        <div id="paid-event-container" className="my-5 xl:px-20">
          <div className="text-2xl font-quicksand font-semibold mb-5 text-center">
            Check Out Our Quality Paid Event
          </div>
          <div
            id="paid-event-preview-container"
            className="flex flex-col space-y-10 md:space-y-0 overflow-x-hidden items-center w-full lg:flex-row md:justify-end 2xl:justify-center 2xl:px-40"
          >
            {paid.events.map((event, index) => {
              let date = new Date(event.startDate);
              date = date.toLocaleDateString();
              return (
                <Link key={index} href={`/events/${event.id}`}>
                  <div
                    id="event-container"
                    className="flex flex-col hover:bg-violet-700 hover:text-white duration-200 border shadow-md w-[300px] h-[300px] rounded-lg md:mx-5 md:my-10"
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
            <div className="flex flex-col items-center space-y-2 md:ml-10">
              <Link
                href={"/events"}
                onClick={() => {
                  setPath("/events/type/Paid");
                }}
              >
                <div className="relative w-10 h-10 hover:scale-125 duration-200">
                  <Image
                    src={"/eventpreview/right-arrow.svg"}
                    fill
                    alt="right-arrow"
                  />
                </div>
              </Link>
              <div className="font-semibold">View More</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
