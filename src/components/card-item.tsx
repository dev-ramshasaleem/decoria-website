"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export function CartItem({ productId, quantity }: any) {
  const router = useRouter();
  const updateCart = async (action: "increase" | "decrease") => {
    await fetch("api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action }),
    });
    router.refresh();
  };
  return (
    <div className="flex items-center gap-2.  ">
      <Button onClick={() => updateCart("decrease")}>−</Button>

      <span className="px-2 border border-black rounded-md ">{quantity}</span>

      <Button onClick={() => updateCart("increase")}>+</Button>
    </div>
  );
}
