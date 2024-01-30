import SearchBar from "./SearchBar";

export default function NotFound() {
  return (
    <>
      <div className="pt-[70px]">
        <SearchBar />
        <div className="w-full h-screen flex justify-center items-center">
          <div className="md:text-xl">
            Sorry, your search didn&apos;t match any items
          </div>
        </div>
      </div>
    </>
  );
}
