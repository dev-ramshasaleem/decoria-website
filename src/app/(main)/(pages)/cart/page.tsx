import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-lg p-4 shadow-sm"
            >
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">${item.product.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 border rounded">-</button>

                <span className="px-2">{item.quantity}</span>

                <button className="px-2 py-1 border rounded">+</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom section */}
      {items.length > 0 && (
        <div className="mt-8 border-t pt-4 flex justify-between items-center">
          <p className="font-semibold text-lg">
            Total: $
            {items.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0,
            )}
          </p>
          <div className="flex gap-2">
            <button className="bg-black text-white px-6 py-2 rounded">
              Continue Shopping
            </button>
            <button className="bg-black text-white px-6 py-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
