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
      <Button onClick={checkout}>Place Order</Button>
    </Link>
  );
}
