'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RemoveButton({productId}:{productId:string
}) {
     const router = useRouter();

  const handleRemove = async () => {
    await fetch(`/api/heart/${productId}`, {
      method: "DELETE",
    });
 router.refresh();
    
    
}
return (
    <Button onClick={handleRemove} className="border-2 border-stone-800 dark:border-white text-stone-800 dark:text-white hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-stone-800 transition-colors duration-300">
      Remove
    </Button>
  );
}