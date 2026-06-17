import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/src/components/card-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckoutButton } from "@/src/components/checkout-button";

export default async function CartPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in</div>;
  }

  const items = await prisma.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>

          <Button
            variant="outline"
            className="w-30 h-10 text-white border-white bg-black/30 hover:bg-black/50"
          >
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-lg p-4 shadow-sm"
            >
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">${item.product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <CartItem productId={item.productId} quantity={item.quantity} />
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-8 border-t pt-4 flex justify-between items-center">
          <p className="font-semibold text-lg">
            Total: $
            {items
              .reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0,
              )
              .toFixed(2)}
          </p>
          <div className="flex gap-2">
            <Link href="/shop">
              <Button className="bg-black text-white px-4 py-3.5 rounded-lg">
                Continue Shopping
              </Button>
            </Link>

            <CheckoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
