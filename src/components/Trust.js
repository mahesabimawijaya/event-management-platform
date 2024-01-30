import Image from "next/image";

export default function Trust() {
  return (
    <>
      <div
        id="trust"
        className="flex flex-col items-center lg:items-start 2xl:items-center w-full h-auto px-7 md:px-20 mt-16 mb-16"
      >
        <div className="text-center text-2xl mb-5 xl:mb-10 font-quicksand font-semibold">
          Your Dreams, Our Reality
        </div>
        <div
          id="trust-img-text"
          className="flex flex-col w-full items-center lg:items-start lg:flex-row lg:space-x-10 2xl:justify-center"
        >
          <div className="relative w-[250px] h-[150px] md:w-[370px] md:h-[220px]">
            <Image src={"/trust/trust.jpg"} fill alt="trust" />
          </div>
          <div className="text-justify mt-7 lg:mt-0 lg:w-[500px] xl:w-[800px]">
            Welcome to UniFy, where your visions come to life with seamless
            precision and unparalleled expertise. Trust is the cornerstone of
            our platform, and we pride ourselves on delivering not just events
            but unforgettable experiences that leave an indelible mark. Our
            dedicated team of seasoned professionals ensures meticulous
            planning, flawless execution, and a commitment to exceeding your
            expectations. <br></br>
            <br></br> From corporate gatherings to intimate celebrations, our
            website serves as a beacon of reliability, transparency, and
            innovation in the event industry. With a user-friendly interface and
            transparent pricing, showcasing our successful ventures, we invite
            you to entrust your special moments to us. Embrace a stress-free
            journey towards event perfection, where trust is not just earned but
            magnificently celebrated.
          </div>
        </div>
      </div>
    </>
  );
}
