"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const images = ["/hero/hero.jpg", "/hero/wedding.jpg", "/hero/food.jpg"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <div className="pt-16">
        <div className="relative w-full h-screen z-[-1]">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              quality={100}
              fill
              priority
              className={`object-cover object-center opacity-0 brightness-50 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : ""
              }`}
            />
          ))}
        </div>
        <div className="absolute top-10 text-white flex flex-col justify-center items-center w-full h-screen tracking-wide">
          <div className="text-3xl text-center sm:text-4xl lg:text-5xl 2xl:text-8xl font-bold mb-2 2xl:mb-7 font-sans">
            Discover Unforgettable Experience
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl 2xl:text-6xl font-semibold font-quicksand">
            Elevate Your Vision Into Reality
          </div>
          <Link href={"/events"}>
            <button className="mt-5 2xl:mt-10 py-2 px-5 2xl:py-4 2xl:px-7 bg-violet-700 rounded-lg text-lg 2xl:text-xl font-quicksand font-semibold tracking-wider hover:bg-white hover:text-violet-700 duration-300">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
