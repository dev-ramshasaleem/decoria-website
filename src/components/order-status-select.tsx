'use client'

export default function OrderStatusSelect({
    orderId,
    status
}:{orderId: string, status: string}) {
    return (
         <select
      defaultValue={status}
      onChange={async (e) => {
        await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: e.target.value,
          }),
        });
      }}
    >
      <option value="PENDING">Pending</option>
      <option value="CONFIRMED">Confirmed</option>
      <option value="PROCESSING">Processing</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
    )
}