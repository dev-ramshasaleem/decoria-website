import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/products";
import Image from "next/image";
import React from "react";

export default async function ShopPage() {
  const products = await getProducts();
  const handleSubmit = () => {
    console.log("Added to Cart");
  };
  return (
    <div className="px-4 pt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-stone-800">
        Shop Our Categories
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="rounded-full overflow-hidden shadow-lg border-2 w-20 h-20">
          <Image
            src="/wall-art.png"
            width={100}
            height={100}
            className="w-full h-full object-cover"
            alt="wall_art"
          />
          Wall Art
        </div>

        <div className="rounded-full overflow-hidden shadow-lg border-2 w-20 h-20">
          <Image
            src="/cushion.png"
            width={100}
            height={100}
            className="w-full h-full object-cover"
            alt="cushion"
          />
        </div>

        <div className="rounded-full overflow-hidden shadow-lg border-2 w-20 h-20">
          <Image
            src="/lamp.png"
            width={100}
            height={100}
            className="w-full h-full object-cover"
            alt="lamp"
          />
        </div>

        <div className="rounded-full overflow-hidden shadow-lg border-2 w-20 h-20">
          <Image
            src="/table-decor.png"
            width={100}
            height={100}
            className="w-full h-full object-cover"
            alt="table-decor"
          />
        </div>

        <div className="rounded-full overflow-hidden shadow-lg border-2 w-20 h-20">
          <Image
            src="/storage.png"
            width={100}
            height={100}
            className="w-full h-full object-cover"
            alt="storage-box"
          />
        </div>
      </div>
      <br />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border p-3 rounded-lg">
            <div className="w-full h-[220px] flex items-center justify-center bg-gray-50 rounded overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="max-h-full w-auto object-contain"
              />
            </div>

            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <h3 className="mt-2 ">{product.description}</h3>
            <p>$ {product.price}</p>
            <div>
              <Button>Add to Cart</Button>

              <Button>Add to Favorite</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
