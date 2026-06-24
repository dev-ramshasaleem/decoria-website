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
    orderItems: {
      include: {
        product: true,
      },
    },
  },
});

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">
      Orders
    </h1>

    <table className="w-full border">
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customerEmail}</td>
            <td>${order.total}</td>
            <td>{order.status}</td>
            <td>
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
    
  </div>
  );
}
