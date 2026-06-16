"use client";
import { Button } from "@/components/ui/button";

export default function AddToFavorite({ productId }: { productId: string }) {
  const addToFavorite = async () => {
    try {
      const res = await fetch("/api/heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (data.success) {
        console.log("Added to Favorite");
      }
    } catch (error) {
      console.error("Error adding to favorite:", error);
    }
  };
  return <Button onClick={addToFavorite}>Add to Favorite</Button>;
}
