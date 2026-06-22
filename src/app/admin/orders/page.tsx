import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: userId, // 🔥 IMPORTANT FIX
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              {/* Order header */}
              <div className="flex justify-between">
                <p className="font-semibold">Order ID: {order.id}</p>
                <span className="text-sm px-2 py-1 rounded bg-gray-200">
                  {order.status}
                </span>
              </div>

              <p className="text-sm mt-1 text-gray-600">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className="mt-2 font-medium">Total: ${order.total}</p>

              <div className="mt-4 space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.id}>
                    Products ={item.product?.name ?? "Deleted Product"} | Qty:{" "}
                    {item.quantity}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
