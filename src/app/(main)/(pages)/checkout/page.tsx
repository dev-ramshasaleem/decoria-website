"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPge() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = async () => {
    try {
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
          paymentMethod, // ✅ added
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/?orderSuccess=1`);
      }

      if (data.success) {
        router.push(`/order-success?orderId=${data.orderId}`);
      }
    } catch (err) {
      console.log("Checkout failed", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* USER INFO */}
      <input
        placeholder="Full Name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Phone"
        className="border p-2 w-full"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Address"
        className="border p-2 w-full"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* PAYMENT METHOD (COD ONLY) */}
      <div className="border p-3 rounded-md space-y-2">
        <h2 className="font-semibold">Payment Method</h2>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery (COD)
        </label>

        <p className="text-xs text-gray-500">
          You will pay when your order is delivered.
        </p>
      </div>
      <Link href="/">
        <Button onClick={handleSubmit} className="w-full">
          Confirm Order
        </Button>
      </Link>
    </div>
  );
}
