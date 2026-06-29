import { prisma } from "@/lib/prisma";
import OrderStatusSelect from "@/src/components/order-status-select";
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
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{index + 1}</td>

                <td className="px-4 py-4 font-mono text-sm">
                  {order.id.slice(0, 10)}...
                </td>

                <td className="px-4 py-4">{order.customerEmail}</td>
                <td className="px-4 py-4">{order.orderItems.length}</td>

                <td className="px-4 py-4 font-semibold">
                  ${order.total.toFixed(2)}
                </td>

                <td className="px-4 py-4">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>

                <td className="px-4 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
