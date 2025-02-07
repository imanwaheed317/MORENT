import Image from "next/image";
import Cars from "@/app/Cars/page";

export default function Home() {
  return (
    <div className="bg-[#f6f7f9] min-h-screen p-4 sm:p-6 lg:p-20 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
      
      {/* Ads Section */}
      <section className="w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 justify-center">
        <Image src="/Ads 1.png" alt="Ad 1" width={640} height={360} className="max-w-full" priority />
        <Image src="/Ads 2.png" alt="Ad 2" width={640} height={360} className="max-w-full" priority />
      </section>

      {/* Pickup & Drop-off Section */}
      <section className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-8">
        <Image src="/Pick - Up.png" alt="Pick Up" width={582} height={132} className="max-w-full" />
        <Image src="/Switch.png" alt="Switch" width={120} height={60} className="max-w-full" />
        <Image src="/Drop - Off.png" alt="Drop Off" width={582} height={132} className="max-w-full" />
      </section>

      {/* Cars Section */}
      <Cars />
      
    </div>
  );
}
