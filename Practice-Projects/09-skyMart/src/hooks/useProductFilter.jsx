import { useMemo } from "react";

export const useProductFilter = (products, search, category, feature) => {
  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "" || item.category === category;
      return matchesSearch && matchesCategory;
    });

    if (feature === "top-rated") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    if (feature === "lowest-rated") {
      result.sort((a, b) => a.rating.rate - b.rating.rate);
    }
    if (feature === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }
    if (feature === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, feature]);

  return { filteredProducts };
};
