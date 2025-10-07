import { Inter } from "next/font/google";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import Card from "@/components/Card";
const inter = Inter({
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className={`w-screen h-fit min-h-screen bg-white items-center p-8 min-w-fit ${inter.className} text-black flex flex-col`}>
      <div className="flex w-full h-fit justify-between ">
        <ShoppingBag size={64} color="#963484" />
        <ShoppingCart size={64} />
      </div>
      <span className="text-5xl/16 font-bold mt-4 text-start w-full">Explore the <br /> latest products</span>
      <span className="text-sm font-medium mt-2 text-start w-full mb-8">
        Check out our new arrivals and <br /> best selling items
      </span>
      <div className="min-w-fit h-fit grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
        <Card title="Super Fancy Ahh Bag" price={12} category="Men's clothing" />
        <Card title="Super Fancy Ahh Shorts" price={20} category="Women's clothing" />
        <Card title="Super Fancy Ahh Bag" price={12} category="Men's clothing" />
        <Card title="Super Fancy Ahh Shorts" price={20} category="Women's clothing" />
        <Card title="Super Fancy Ahh Bag" price={12} category="Men's clothing" />
        <Card title="Super Fancy Ahh Shorts" price={20} category="Women's clothing" />
        <Card title="Super Fancy Ahh Bag" price={12} category="Men's clothing" />
        <Card title="Super Fancy Ahh Shorts" price={20} category="Women's clothing" />
      </div>

    </div>
  );
}