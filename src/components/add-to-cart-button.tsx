"use client";

import { Button } from "@/components/ui/button";

export default function AddToCartButton({ productId }: { productId: string }) {
  const addToCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (data.success) {
        console.log("Added to Cart");
      }
    } catch (error) {
      console.error("error");
    }
  };
  return <Button onClick={addToCart}>Add to Cart</Button>;
}
