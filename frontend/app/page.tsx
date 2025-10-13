'use client';
import { Inter } from "next/font/google";
import { ShoppingBag, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
const inter = Inter({ subsets: ['latin'] });

interface ShopItemType {
  id: number;
  title: string;
  price: number;
  category: { id: number; name: string };
  images: string[];
}

export default function Home() {
  const [items, setItems] = useState<ShopItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await (await fetch(process.env.NEXT_PUBLIC_API + "/products")).json();
        setItems(res || []);
      } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        else console.log('idk');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(items.map(i => i.category?.name || "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = items.filter(item => {
      if (q && !item.title.toLowerCase().includes(q)) return false;
      if (category !== "All" && item.category?.name !== category) return false;
      if (minPrice !== "" && item.price < Number(minPrice)) return false;
      if (maxPrice !== "" && item.price > Number(maxPrice)) return false;
      return true;
    });

    if (sortBy === "price-asc") out = out.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") out = out.sort((a, b) => b.price - a.price);

    return out;
  }, [items, query, category, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  if (loading) {
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
        <div className="w-full">
          loading...
        </div>
      </div>
    );
  }

  return (
    <div className={`w-screen h-fit min-h-screen bg-white items-center p-8 min-w-fit ${inter.className} text-black flex flex-col`}>
      <div className="flex w-full h-fit justify-between ">
        <ShoppingBag size={64} color="#963484" />
        <ShoppingCart size={64} />
      </div>

      <div className="w-full mt-4">
        <span className="text-5xl/16 font-bold">Explore the <br /> latest products</span>
        <span className="text-sm font-medium mt-2 block mb-4">
          Check out our new arrivals and best selling items
        </span>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between mb-6">
          <div className="flex gap-3 w-full md:w-2/3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border rounded-lg">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-3 py-2 border rounded-lg">
              <option value="default">Sort</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          <div className="flex gap-2 items-center w-full md:w-auto">
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="Min"
              className="w-20 px-2 py-2 border rounded-lg"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-20 px-2 py-2 border rounded-lg"
            />
            <button onClick={clearFilters} className="px-3 py-2 border rounded-lg flex items-center gap-1">
              <X size={14} /> Clear
            </button>
            <button className="px-3 py-2 border rounded-lg flex items-center gap-1 bg-green-500 text-white">
              Add items
            </button>
          </div>
        </div>

        <div className="w-full mb-4 text-sm text-gray-600">{filteredItems.length} result(s)</div>

        <div className="min-w-fit h-fit grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} image={item.images[0]} title={item.title} price={item.price} category={item.category.name} />
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">
              No items match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
