import Image from "next/image";
import Navbar from "./components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <div className="items-center justify-between pt-70 ">
          <h1 className=" flex flex-col items-center text-6xl text-red-900 ">
            Design Your Space, Define Your Story
          </h1>
          <p className="flex flex-col items-center pt-6 text-xl text-gray-700">
            Premium home decor that transforms ordinary spaces into aesthetic
            living experience.
          </p>
          <div className="flex flex-col items-center p-6">
            <Button
              variant="outline"
              className=" text-black w-26 h-10 bg-black/40 hover:bg-gray-40"
            >
              <Link href="/shop">Categories</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
