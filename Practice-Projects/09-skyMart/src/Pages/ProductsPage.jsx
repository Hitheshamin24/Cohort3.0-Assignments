import React, { useContext } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../context/ProductContext";
const ProductPage = () => {
  const { products } = useContext(Product);
  console.log(products);
  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      {/* Heading */}
      <div>
        <h1 className="font-syne text-[36px] font-bold text-white">
          All Products
        </h1>

        <p className="mt-2 font-dm-sans text-[14px] text-zinc-500">
          50 products found
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mt-10 rounded-3xl border border-zinc-600 bg-[#101010] p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-12 rounded-2xl border border-zinc-700 bg-[#1b1b1b] pl-11 pr-4 font-dm-sans text-[14px] text-white placeholder:text-zinc-500 outline-none focus:border-lime-400"
            />
          </div>

          {/* Category */}
          <div className="relative w-full lg:w-44">
            <select className="appearance-none w-full h-12 rounded-2xl border border-zinc-700 bg-[#1b1b1b] px-4 pr-10 font-dm-sans text-[14px] text-white outline-none focus:border-lime-400">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Sports</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
          </div>

          {/* Sort */}
          <div className="relative w-full lg:w-44">
            <select className="appearance-none w-full h-12 rounded-2xl border border-zinc-700 bg-[#1b1b1b] px-4 pr-10 font-dm-sans text-[14px] text-white outline-none focus:border-lime-400">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {products.map((product)=>{
        return (
            <ProductCard key={product.id} product={product} />
        )
       })}
      </div>
    </section>
  );
};

export default ProductPage;
