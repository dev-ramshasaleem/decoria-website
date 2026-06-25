"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddToFavorite({
  productId,
  initialFavorite,
}: {
  productId: string;
  initialFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);
  const addToFavorite = async () => {
    try {
      setLoading(true);
      setIsFavorite((prev) => !prev);
      const res = await fetch("/api/heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      console.log("API response:", data);

      setIsFavorite(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={addToFavorite} disabled={loading} className="border-2 border-stone-800 dark:border-white text-stone-800 dark:text-white hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-stone-800 transition-colors duration-300">
      {isFavorite ? "❤️" : "🤍"}
    </Button>
  );
}
