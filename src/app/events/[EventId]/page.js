"use client";

import useSWR from "swr";
import Image from "next/image";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function EventDetails({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/event/${params.EventId}`,
    fetcher
  );
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  function formatToRupiah(number) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  }

  return (
    <>
      <div className="flex flex-col w-full mb-[200px]">
        <div className="pt-[71px] w-full flex flex-col lg:flex-row lg:justify-center lg:pt-32 2xl:px-[500px]">
          <div className="relative w-full lg:w-[1140px] h-[250px] md:h-[370px] xl:h-[400px] lg:ml-10 xl:ml-24">
            <Image
              className="object-cover object-center lg:rounded-md"
              src={data.image}
              fill
              alt="image"
            />
          </div>
          <div className="w-full flex flex-col px-5 pt-5 lg:pt-0 xl:w-[1100px]">
            <div className="text-xl xl:text-2xl font-semibold">{data.name}</div>
            <div className="text-justify">{data.description}</div>
            <div className="font-semibold mt-5 mb-1">Tickets : </div>
            <div id="tickets" className="flex items-center space-x-3">
              {data.tickets.map((ticket, index) => {
                return (
                  <div
                    key={index}
                    className={`text-sm mb-1 border rounded-md px-5 py-2 ${
                      ticket.category == "VIP"
                        ? "border-yellow-400"
                        : "border-blue-500"
                    }`}
                  >
                    <div className="font-semibold">{ticket.category}</div>
                    <div className="flex items-center space-x-2">
                      <div className="relative w-5 h-5">
                        <Image src={"/event/money.png"} fill alt="money" />
                      </div>
                      <div className="text-green-600 font-semibold">
                        {formatToRupiah(ticket.price)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="relative w-5 h-5">
                        <Image src={"/event/seats.png"} fill alt="money" />
                      </div>
                      <div>{ticket.available} seats</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="date" className="flex items-center mt-6 text-sm">
              <div className="relative w-5 h-5 ">
                <Image src={"/event/calendar.png"} fill alt="calendar" />
              </div>
              <div className="mx-3">
                {new Date(data.start_date).toLocaleDateString()}
              </div>
              <div>-</div>
              <div className="ml-3">
                {new Date(data.end_date).toLocaleDateString()}
              </div>
            </div>
            <div id="time" className="flex items-center text-sm mt-3">
              <div className="relative w-5 h-5">
                <Image src={"/event/clock.png"} fill alt="clock" />
              </div>
              <div className="mx-3">
                {new Date(data.start_time).toLocaleTimeString()}
              </div>
              <div>-</div>
              <div className="ml-3">
                {new Date(data.end_time).toLocaleTimeString()}
              </div>
            </div>
            <div id="loc" className="flex text-sm mt-3">
              <div className="relative w-5 h-5">
                <Image src={"/event/location.png"} fill alt="location" />
              </div>
              <div className="ml-3">{data.location}</div>
            </div>
            <div
              className={`mt-5 w-14 px-3 py-1 rounded-md font-semibold ${
                data.type === "Free" ? "text-green-700" : "text-slate-100"
              } ${data.type === "Free" ? "bg-green-400" : "bg-sky-400"}`}
            >
              {data.type}
            </div>
            <div className="mt-5 text-sm">
              {new Date(data.createdAt).toLocaleString()}
            </div>
            <Link href={`/${data.id}`}>
              <button className="bg-violet-700 w-full mt-[60px] xl:mt-[100px] text-white rounded-md py-2 font-semibold lg:hidden">
                Buy Ticket
              </button>
            </Link>
          </div>
        </div>
        <Link href={`/${data.id}`}>
          <div className="flex justify-center">
            <button className="bg-violet-700 mt-[60px] px-80 text-white rounded-md py-3 font-semibold hidden lg:block">
              Buy Ticket
            </button>
          </div>
        </Link>
        <div id="review" className="flex flex-col px-5 mt-16">
          <div className="text-lg font-semibold">Review</div>
          <div className="border-t border-t-gray-300 mt-1 pt-4">
            {new Date().getTime() > new Date(data.end_date).getTime()
              ? "review"
              : "Event hasn't ended yet"}
          </div>
        </div>
      </div>
    </>
  );
}
