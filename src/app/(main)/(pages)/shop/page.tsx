import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
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
    </div>
  );
};

export default page;
