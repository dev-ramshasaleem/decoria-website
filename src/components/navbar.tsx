"use client";
import { Input } from "@/components/ui/input";
import { UserButton, useUser } from "@clerk/nextjs";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
   <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-stone-600">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-3">

    {/* Logo */}
    <Link href="/">
      <h1 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
        D E C O R I A
      </h1>
    </Link>

    {/* Search */}
    <div className="relative w-full md:max-w-xl">
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
        className="w-full pr-10 rounded-lg border border-black/50 bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
      />

      <Search
        size={20}
        onClick={handleSubmit}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-900 dark:text-white"
      />

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow-lg">
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                router.push(`/shop?search=${item.name}`);
                setQuery("");
                setSuggestions([]);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Icons */}
    <div className="flex items-center justify-center md:justify-end gap-4">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <User className="h-7 w-7 md:h-8 md:w-8" />
        </Link>
      )}

      <Link href="/heart">
        <Heart className="h-7 w-7 md:h-8 md:w-8" />
      </Link>

      <Link href="/cart">
        <ShoppingCart className="h-7 w-7 md:h-8 md:w-8" />
      </Link>
    </div>

  </div>
</header>
  );
};
export default Navbar;
