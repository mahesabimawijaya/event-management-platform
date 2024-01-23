"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="bg-white fixed w-full shadow py-2 md:flex md:items-center md:justify-between md:px-8 z-10">
      <div
        id="nav-left"
        className="flex items-center justify-between px-5 md:px-0 space-x-1 cursor-pointer"
      >
        <Link href={"/"}>
          <div
            className="flex items-center md"
            onClick={() => {
              setNavbar(!navbar);
              let list = document.getElementById("nav-right");
              navbar
                ? (list.classList.remove("top-[70px]"),
                  list.classList.remove("opacity-100"))
                : setNavbar(navbar);
            }}
          >
            <div className="relative w-[60px] h-[55px]">
              <Image
                src={"/navbar/unify-logo.png"}
                fill={true}
                alt="unify-logo"
                placeholder="blur"
                blurDataURL={"/navbar/unify-logo.png"}
                sizes="60px"
              />
            </div>
            <div className="font-quicksand font-bold text-2xl tracking-wide text-violet-700">
              UniFy
            </div>
          </div>
        </Link>
        <button
          className="relative w-[25px] h-[25px] md:hidden"
          onClick={() => {
            setNavbar(!navbar);
            let list = document.getElementById("nav-right");
            navbar
              ? (list.classList.remove("top-[70px]"),
                list.classList.remove("opacity-100"))
              : (list.classList.add("top-[70px]"),
                list.classList.add("opacity-100"));
          }}
        >
          {navbar ? (
            <Image
              id="close"
              src={"/navbar/close.png"}
              fill={true}
              sizes="25px"
              alt="close-menu"
            />
          ) : (
            <Image
              id="menu"
              src={"/navbar/menu.png"}
              fill={true}
              sizes="25px"
              alt="burger-menu"
            />
          )}
        </button>
      </div>
      <div
        id="nav-right"
        className="pl-5 z-[-1] md:z-auto absolute md:static w-full opacity-0 md:opacity-100 top-[-400px] transition-all ease-in duration-500 md:w-auto bg-white md:pl-0 md:flex md:space-x-10 font-quicksand font-semibold md:items-center"
      >
        <Link href={"/about"}>
          <div
            className="my-5 md:my-0"
            onClick={() => {
              setNavbar(!navbar);
              let list = document.getElementById("nav-right");
              navbar
                ? (list.classList.remove("top-[70px]"),
                  list.classList.remove("opacity-100"))
                : (list.classList.add("top-[70px]"),
                  list.classList.add("opacity-100"));
            }}
          >
            About
          </div>
        </Link>
        <Link href={"/events"}>
          <div
            className="my-5 md:my-0"
            onClick={() => {
              setNavbar(!navbar);
              let list = document.getElementById("nav-right");
              navbar
                ? (list.classList.remove("top-[70px]"),
                  list.classList.remove("opacity-100"))
                : (list.classList.add("top-[70px]"),
                  list.classList.add("opacity-100"));
            }}
          >
            Events
          </div>
        </Link>
        <Link href={"/teams"}>
          <div
            className="my-5 md:my-0"
            onClick={() => {
              setNavbar(!navbar);
              let list = document.getElementById("nav-right");
              navbar
                ? (list.classList.remove("top-[70px]"),
                  list.classList.remove("opacity-100"))
                : (list.classList.add("top-[70px]"),
                  list.classList.add("opacity-100"));
            }}
          >
            Teams
          </div>
        </Link>
        <div className="flex flex-col w-40 md:w-auto space-y-2 mt-10 md:mt-0 md:space-y-0 md:flex-row md:pl-10 md:space-x-5 md:items-center mb-5 md:mb-0">
          <Link href={"/login"}>
            <button
              className="bg-violet-600 py-2 px-[27px] md:px-4 rounded text-white cursor-pointer border border-violet-600 duration-150 hover:bg-white hover:text-violet-600"
              onClick={() => {
                setNavbar(!navbar);
                let list = document.getElementById("nav-right");
                navbar
                  ? (list.classList.remove("top-[70px]"),
                    list.classList.remove("opacity-100"))
                  : (list.classList.add("top-[70px]"),
                    list.classList.add("opacity-100"));
              }}
            >
              Login
            </button>
          </Link>
          <Link href={"register"}>
            <button
              className="border border-violet-600 py-2 px-4 rounded text-violet-600 cursor-pointer hover:bg-violet-600 duration-150 hover:text-white"
              onClick={() => {
                setNavbar(!navbar);
                let list = document.getElementById("nav-right");
                navbar
                  ? (list.classList.remove("top-[70px]"),
                    list.classList.remove("opacity-100"))
                  : (list.classList.add("top-[70px]"),
                    list.classList.add("opacity-100"));
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
