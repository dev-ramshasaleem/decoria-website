"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CheckoutButton({ name, email, phone, address }: any) {
  const router = useRouter();

  const checkout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push(`/order-success?orderId=${data.orderId}`);
    }
  };

  return (
    <Link href="/checkout">
      <Button onClick={checkout} className="border-2 border-stone-800 dark:border-white text-stone-800 dark:text-white hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-stone-800 transition-colors duration-300">Place Order</Button>
    </Link>
  );
}
