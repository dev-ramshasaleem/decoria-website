"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddToCartButton({
  productId,
  initialAdded,
}: {
  productId: string;
  initialAdded: boolean;
}) {
  const [isAdd, setIsAdd] = useState(initialAdded);
  const [loading, setLoading] = useState(false);
  const addToCart = async () => {
    try {
      setLoading(true);
      setIsAdd((prev) => !prev);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action: "increase" }),
      });
      const data = await res.json();

      console.log("API response:", data);

      setIsAdd(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={addToCart} disabled={false} className="border-2 border-stone-800 dark:border-white text-stone-800 dark:text-white hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-stone-800 transition-colors duration-300">
      {isAdd ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
}
