import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "../components/navbar";
import { ModeToggle } from "../components/mode-toggle";

export default async function Home() {
  return (
    <div>
      <main>
        <Navbar />
        {/* Hero Section */}
        <div className=" relative w-full h-[1000px]">
          <Image
            src="/back.png"
            fill
            alt="background_image"
            className="object-cover"
          />
          {/* overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 px-4">
            {/* <div className="fixed absolute top-15 right-4 ">
              <ModeToggle />
            </div> */}
            <h1 className="text-white text-5xl md:text-6xl font-bold">
              Design Your Space, Define Your Story
            </h1>

            <p className="mt-4 text-gray-200 text-xl">
              Premium home decor that transforms ordinary spaces into aesthetic
              living experience.
            </p>

            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                className="w-20 h-10 text-white border-white bg-black/30 hover:bg-black/10"
              >
                <Link href="/">Home</Link>
              </Button>

              <Button
                variant="outline"
                className="w-20 h-10 text-white border-white bg-black/30 hover:bg-black/10"
              >
                <Link href="/shop">Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
