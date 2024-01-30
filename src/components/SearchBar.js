"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import useSWR from "swr";
import { Path } from "@/context/Path";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
  const [filter, setFilter] = useState(false);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const [debouncedValue] = useDebounce(search, 1000);

  const { setPath } = useContext(Path);
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/events/locations`,
    fetcher
  );

  const fetchEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/events/names`,
      {
        params: {
          search: debouncedValue,
        },
      }
    );
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedValue]);

  console.log(events);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <div
        id="searchbar"
        className="fixed bg-white w-full h-16 shadow-sm flex items-center justify-center pr-3 md:pr-8 space-x-4 md:space-x-0 md:justify-between z-10"
      >
        <div className="ml-28 hidden md:flex"></div>
        <div id="search" className="flex flex-1 items-center justify-center">
          <input
            id="search-input"
            type="text"
            placeholder="Search"
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              const recom = document.getElementById("recom");
              recom.classList.contains("hidden")
                ? recom.classList.remove("hidden")
                : "";
            }}
            onFocus={() => {
              const input = document.getElementById("search-input");
              const searchBtn = document.getElementById("search-button");
              const recom = document.getElementById("recom");
              recom.classList.remove("hidden");
              input.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchBtn.click();
                }
              });
            }}
            onBlur={() => {
              const recom = document.getElementById("recom");
              recom.classList.add("hidden");
            }}
            className="border pl-5 w-0 h-[38px] md:h-[46px] flex-1 max-w-96 2xl:max-w-[450px] rounded-l-full focus:border-violet-600 focus:outline-none"
          ></input>
          <button
            id="search-button"
            onClick={() => {
              setPath(`events/search=${search}`);
              router.push(`/events?page=1&per_page=9`);
              const recom = document.getElementById("recom");
              recom.classList.add("hidden");
            }}
            type="submit"
            className="border py-2 pl-4 pr-5 rounded-r-full border-l-0 hover:border-violet-600 hover:border-l-[1px] duration-200"
          >
            <div className="relative w-5 md:w-7 h-5 md:h-7">
              <Image
                src={"/searchbar/search.png"}
                fill
                sizes="28px"
                alt="search"
              />
            </div>
          </button>
          <div
            id="recom"
            className="absolute hidden bg-white top-[60px] md:mr-[60px] shadow-md md:w-[380px] rounded-md"
          >
            {events.events?.slice(0, 7).map((event, index) => (
              <div
                className="px-5 py-2 hover:bg-gray-200 cursor-pointer"
                key={index}
              >
                {event.name}
              </div>
            ))}
          </div>
        </div>
        <div
          id="filter-sort"
          className="flex items-center space-x-2 md:space-x-4"
        >
          <button>
            <div
              className="relative w-7 h-7"
              onClick={() => {
                setPath("events");
                router.push(`/events?page=1&per_page=9`);
                let locations = document.getElementById("locations");
                let dropdown = document.getElementById("dropdown");
                locations.classList.contains("hidden")
                  ? ""
                  : locations.classList.add("hidden");
                dropdown.classList.contains("hidden")
                  ? ""
                  : dropdown.classList.add("hidden");
              }}
            >
              <Image src={"/searchbar/refresh.png"} fill alt="reset" />
            </div>
          </button>
          <button>
            <div
              className="relative w-5 h-5"
              onClick={() => {
                setFilter(!filter);
                let dropdown = document.getElementById("dropdown");
                let locations = document.getElementById("locations");
                let category = document.getElementById("category");
                filter
                  ? (dropdown.classList.add("hidden"),
                    locations.classList.add("hidden"),
                    category.classList.add("hidden"))
                  : dropdown.classList.remove("hidden");
              }}
            >
              <Image
                src={"/searchbar/filter.png"}
                fill
                sizes="24px"
                alt="filter"
              />
            </div>
          </button>
          <div
            id="dropdown"
            className="absolute hidden w-32 right-5 mt-28 bg-white shadow-md border font-quicksand font-semibold rounded"
          >
            <div
              onClick={() => {
                let locations = document.getElementById("locations");
                let dropdown = document.getElementById("dropdown");
                locations.classList.remove("hidden");
                dropdown.classList.add("hidden");
              }}
              className="flex justify-center items-center h-10 hover:bg-slate-300 cursor-pointer"
            >
              Location
            </div>
            <div
              onClick={() => {
                let category = document.getElementById("category");
                let dropdown = document.getElementById("dropdown");
                category.classList.remove("hidden");
                dropdown.classList.add("hidden");
              }}
              className="h-10 flex justify-center items-center hover:bg-slate-300 cursor-pointer"
            >
              Category
            </div>
          </div>
          <div
            id="locations"
            className="absolute hidden w-32 z-50 right-5 mt-44 bg-white shadow-md border font-quicksand font-semibold rounded"
          >
            {data.map((location, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setPath(`events/${location.location}`);
                    let locations = document.getElementById("locations");
                    locations.classList.add("hidden");
                  }}
                  className="flex justify-center items-center h-10 hover:bg-slate-300 cursor-pointer"
                >
                  {location.location}
                </div>
              );
            })}
          </div>
          <div
            id="category"
            className="absolute hidden w-32 right-5 mt-28 bg-white shadow-md border font-quicksand font-semibold rounded"
          >
            <div
              onClick={() => {
                setPath("events/type/Free");
                let category = document.getElementById("category");
                category.classList.add("hidden");
              }}
              className="flex justify-center items-center h-10 hover:bg-slate-300 cursor-pointer"
            >
              Free
            </div>
            <div
              onClick={() => {
                setPath("events/type/Paid");
                let category = document.getElementById("category");
                category.classList.add("hidden");
              }}
              className="h-10 flex justify-center items-center hover:bg-slate-300 cursor-pointer"
            >
              Paid
            </div>
          </div>
          <button type="button">
            <div className="relative w-6 h-6">
              <Image src={"/searchbar/sort.png"} fill sizes="32px" alt="sort" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
