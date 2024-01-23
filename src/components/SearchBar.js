import Image from "next/image";

export default function SearchBar() {
  return (
    <>
      <div
        id="searchbar"
        className="fixed bg-white w-full h-16 shadow-sm flex items-center justify-center pr-3 md:pr-8 space-x-4 md:space-x-0 md:justify-between"
      >
        <div className="ml-28 hidden md:flex"></div>
        <div id="search" className="flex flex-1 items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="border pl-5 w-0 h-[38px] md:h-[46px] flex-1 max-w-96 2xl:max-w-[450px] rounded-l-full focus:border-violet-600 focus:outline-none"
          ></input>
          <button
            type="button"
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
        </div>
        <div
          id="filter-sort"
          className="flex items-center space-x-2 md:space-x-4"
        >
          <button type="button">
            <div className="relative w-6 h-6">
              <Image
                src={"/searchbar/filter.png"}
                fill
                sizes="24px"
                alt="filter"
              />
            </div>
          </button>
          <button type="button">
            <div className="relative w-8 h-8">
              <Image src={"/searchbar/sort.png"} fill sizes="32px" alt="sort" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
