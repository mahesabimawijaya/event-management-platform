import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="pt-20 pb-5 flex flex-col w-full h-screen justify-center items-center font-quicksand text-center">
      <div className="text-4xl font-semibold text-red-700">
        Data Failed to Load
      </div>
      <div className="font-semibold text-xl mt-3">
        There is error either on the API or source code
      </div>
      <div className="relative w-[200px] md:w-[300px] h-[300px] my-10">
        <Image src={"/event/error.png"} fill={true} alt="sad" />
      </div>
      <Link href={"/"}>
        <button className="py-2 px-4 font-semibold text-white bg-red-700 mt-5 rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
