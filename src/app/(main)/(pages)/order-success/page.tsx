import Link from "next/link";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">Order Confirmed 🎉</h1>

      <p className="mt-4">Your order has been placed successfully.</p>

      <p className="mt-2 text-gray-500">Order ID: {params.orderId}</p>
      {/* <Link href="/">
        <Button onClick={handleSubmit} className="w-full">
          Confirm Order
        </Button>
        //{" "}
      </Link> */}
    </div>
  );
}
