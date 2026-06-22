import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: true,
    },
  });

  return (
    <div>
      <h1 className="text-xl font-bold">All Orders</h1>

      <div className="mt-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded">
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: {order.total}</p>

            <div className="mt-2">
              {order.orderItems.map((item) => (
                <div key={item.id}>
                  Product: {item.productId} | Qty: {item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
