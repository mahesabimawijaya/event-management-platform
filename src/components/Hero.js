import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="pt-16">
        <div className="relative w-full h-[600px] 2xl:h-[1000px] z-[-1]">
          <Image
            src={"/hero/hero.jpg"}
            className="brightness-50 object-cover"
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="hero"
          />
        </div>
        <div className="absolute top-10 text-white flex flex-col justify-center items-center w-full h-[600px] 2xl:h-[1000px] tracking-wide">
          <div className="text-3xl text-center sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-2 font-sans">
            Discover Unforgettable Experience
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-semibold font-sans">
            Elevate Your Vision Into Reality
          </div>
          <Link href={"/events"}>
            <button className="mt-5 py-2 px-5 bg-violet-700 rounded-lg text-lg font-quicksand font-semibold tracking-wider hover:bg-white hover:text-violet-700 duration-300">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
