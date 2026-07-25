import React, { useContext } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../context/ProductContext";
import { useForm } from "react-hook-form";
const ProductPage = () => {
  const { register, watch, reset } = useForm({
    defaultValues: {
      search: "",
      category: "",
      feature: "",
    },
  });
  const search = watch("search");
  const category = watch("category");
  const feature = watch("feature");
  const hasFilters = search || category || feature;
  const { products } = useContext(Product);
  const categories = [...new Set(products.map((item) => item.category))];
  let filteredProducts = products.filter((item) => {
    // Search
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Category
    const matchesCategory = category === "" || item.category === category;

    return matchesSearch && matchesCategory;
  });
  if (feature === "top-rated") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  if (feature === "lowest-rated") {
    filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
  }

  if (feature === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (feature === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      {/* Heading */}
      <div>
        <h1 className="font-syne text-[36px] font-bold text-white">
          All Products
        </h1>

        <p className="mt-2 font-dm-sans text-[14px] text-zinc-500">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mt-10 rounded-3xl border border-zinc-600 bg-[#101010] p-5">
        <div className="flex flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              {...register("search")}
              type="text"
              placeholder="Search products..."
              className="w-full h-12 rounded-2xl border border-zinc-700 bg-[#1b1b1b] pl-11 pr-4 font-dm-sans text-[14px] text-white placeholder:text-zinc-500 outline-none focus:border-lime-400"
            />
          </div>

          {/* Category */}
          <div className="relative w-44">
            <select
              {...register("category")}
              className="appearance-none w-full h-12 rounded-2xl border border-zinc-700 bg-[#1b1b1b] px-4 pr-10 font-dm-sans text-[14px] text-white outline-none focus:border-lime-400"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
          </div>

          {/* Sort */}
          <div className="relative w-44">
            <select
              {...register("feature")}
              className="appearance-none w-full h-12 rounded-2xl border border-zinc-700 bg-[#1b1b1b] px-4 pr-10 font-dm-sans text-[14px] text-white outline-none focus:border-lime-400"
            >
              <option value="">Featured</option>
              <option value="top-rated">Top rated</option>
              <option value="lowest-rated">Lowest rated</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={() =>
                reset({
                  search: "",
                  category: "",
                  sort: "",
                })
              }
              className="h-12 px-6 rounded-2xl border border-red-500/30 bg-[#1b1b1b] text-red-400 font-dm-sans text-sm hover:bg-red-500/10 transition"
            >
              ✕ Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {search && (
            <span className="px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400">
              {search}
            </span>
          )}

          {category && (
            <span className="px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400">
              {category}
            </span>
          )}

          {feature && (
            <span className="px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400">
              {feature}
            </span>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default ProductPage;
