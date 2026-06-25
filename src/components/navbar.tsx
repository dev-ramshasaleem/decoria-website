"use client";
import { Input } from "@/components/ui/input";
import { UserButton, useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { isSignedIn } = useUser();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/search?q=${value}`);
    const data = await res.json();

    setSuggestions(data);
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!query.trim()) return;

    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };
  return (
    <header className="top-0 left-0 right-0 flex items-center justify-between border-b px-4 py-2 bg-white dark:bg-black text-stone-700 dark:text-white border-stone-600">
      <Link href="/">
        <p className="text-3xl font-bold text-black-700">D E C O R I A</p>
      </Link>

      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            fetchSuggestions(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/shop?search=${query}`);
              setSuggestions([]);
            }
            
          }}
          placeholder="Search products..."
className="w-150 px-4 py-2 rounded-lg border border-black/50 bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"/>

        {suggestions.length > 0 && (
          <div className="absolute z-50 mt-2 w-full bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-lg shadow-lg">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push(`/shop?search=${item.name}`);
                  setQuery("");
                  setSuggestions([]);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-zinc-500"
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
        <Search
className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-900 dark:text-white"
size={20}
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
