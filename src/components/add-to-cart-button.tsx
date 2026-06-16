"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isAdd, setIsAdd] = useState<boolean | null>(null);
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
    <Button onClick={addToCart} disabled={false}>
      {isAdd ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
}
