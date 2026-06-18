"use client";
import { Input } from "@/components/ui/input";
import { UserButton, useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type Props = {};

const Navbar = (props: Props) => {
  const [query, setQuery] = useState("");
  const { isSignedIn } = useUser();

  const handleSubmit = () => {
    console.log("Searching for:", query);
  };
  return (
    <header className=" top-0 left-0 right-0 flex items-center justify-between border-b text-stone-700 bg-white-500 border-stone-600 px-4 py-2">
      <Link href="/">
        <p className="text-3xl font-bold text-black-700">D E C O R I A</p>
      </Link>

      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Search products..."
          className="w-150 px-4 py-2 border border-black/50 text-black rounded-lg focus:ring-2 focus:ring-black/400"
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-900"
          size={18}
          onClick={handleSubmit}
        />
      </div>
      <div className="flex gap-4">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Image src="/profile.png" width={30} height={30} alt="Search" />
          </Link>
        )}

        <Link href="/heart">
          <Image src="/heart.png" width={30} height={30} alt="Search" />
        </Link>
        <Link href="/cart">
          <Image src="/cartlogo.png" width={30} height={30} alt="Cart" />
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
