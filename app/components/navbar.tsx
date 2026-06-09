import Image from "next/image";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between border-b border-neutral-500 bg-red-100 px-4 py-2">
      <p className="text-3xl font-bold">D E C O R I A</p>

      <div className="flex items-center gap-4 ">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
      </div>
      <div className="flex gap-4">
        <Image src="/search.png" width={30} height={30} alt="Search" />
        <Image src="/cartlogo.png" width={30} height={30} alt="Cart" />
      </div>
    </header>
  );
};
export default Navbar;
