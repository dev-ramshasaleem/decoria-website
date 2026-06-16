"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddToFavorite({ productId }: { productId: string }) {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
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
    <Button onClick={addToFavorite} disabled={loading}>
      {isFavorite ? "❤️" : "🤍"}
    </Button>
  );
}
