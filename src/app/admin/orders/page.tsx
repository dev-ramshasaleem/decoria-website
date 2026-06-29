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
<<<<<<< HEAD
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
=======
   <div className="p-6">
  <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
    Orders
  </h1>

  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
    <table className="w-full">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            #
          </th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Order ID
          </th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Customer
          </th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Items
          </th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Total
          </th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Status
          </th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Date
          </th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order, index) => (
          <tr
            key={order.id}
            className="border-t border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <td className="px-4 py-4 text-gray-700 dark:text-gray-200">
              {index + 1}
            </td>

            <td className="px-4 py-4 font-mono text-sm text-gray-600 dark:text-gray-300">
              {order.id.slice(0, 10)}...
            </td>

            <td className="px-4 py-4 text-gray-700 dark:text-gray-200">
              {order.customerEmail}
            </td>

            <td className="px-4 py-4 text-gray-700 dark:text-gray-200">
              {order.orderItems.length}
            </td>

            <td className="px-4 py-4 font-semibold text-green-600 dark:text-green-400">
              ${order.total.toFixed(2)}
            </td>

            <td className="px-4 py-4  text-black dark:text-gray-400">
              <OrderStatusSelect
                orderId={order.id}
                status={order.status}
              />
            </td>

            <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
>>>>>>> 8cff7b3 (update css)
  );
}
