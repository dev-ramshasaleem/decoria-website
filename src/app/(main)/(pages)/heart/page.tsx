import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function HeartPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Please Sign in</div>;
  }
  const items = await prisma.heartItem.findMany({
    where: {
      userId,
    },
    include: { product: true },
  });
  return (
    <div className="min-h-screen flex justify-center px-4 mt-20">
      <div className="w-full max-w-2xl">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              You have no Favorite Items
            </h2>

            <Button
              variant="outline"
              className="w-30 h-10 text-white border-white bg-black/30 hover:bg-black/50"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2 w-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded p-3 shadow-sm"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
