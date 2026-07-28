import React, { useContext, useEffect, useState } from "react";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Product } from "../context/ProductContext";
import ProductCard from "../components/product/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    products,
    singleProduct,
    getSingleProduct,
    addToCart,
    toggleFavorite,
    checkIfProductExists,
    cart,
    increaseQuantity,
    decreaseQuantity,
    setCartDrawer
  } = useContext(Product);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      await getSingleProduct(id);
      setIsLoading(false);
    };
    fetchProduct();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);
  
  const cartItem = cart.find((item) => item.id === singleProduct.id);
  const quantity = cartItem?.quantity || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading product...
      </div>
    );
  }

  if (!singleProduct || Object.keys(singleProduct).length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Product Not Found
      </div>
    );
  }

  const nextProduct = () => {
    if (Number(id) < products.length) {
      navigate(`/products/${Number(id) + 1}`);
    }
  };

  const previousProduct = () => {
    if (Number(id) > 1) {
      navigate(`/products/${Number(id) - 1}`);
    }
  };

  return (
    <div className="min-h-screen  text-white px-6 lg:px-8 py-5">
      {" "}
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[14px] font-dm-sans text-[#8A8A8A] mb-8">
        <Link to="/products" className="hover:text-lime-400 duration-200">
          Products
        </Link>

        <span>/</span>

        <span>{singleProduct.category}</span>

        <span>/</span>

        <span className="truncate max-w-[180px]">{singleProduct.title}</span>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 ">
        {/* Image */}
        <div className="bg-white rounded-3xl flex justify-center items-center p-12 h-[500px]">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="max-h-75 w-auto object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <span className="inline-flex items-center rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 px-3 py-1 text-[12px] font-medium text-[#C8FF00]">
            {singleProduct.category}
          </span>

          <h1 className="font-syne text-[42px] leading-none font-bold mt-5">
            {singleProduct.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-2 text-[14px] font-dm-sans text-gray-400">
            <div className="flex">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill={
                      index < Math.round(singleProduct.rating.rate)
                        ? "#facc15"
                        : "none"
                    }
                    className={
                      index < Math.round(singleProduct.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }
                  />
                ))}
              </div>
            </div>

            <span>{singleProduct.rating.rate}</span>

            <span>({singleProduct.rating.count} reviews)</span>
          </div>

          <div className="border-b border-zinc-700 mt-2"></div>

          <h2 className="font-syne text-[48px] font-bold  text-[#C8FF00]">
            ${singleProduct.price}
          </h2>
          <div className="border-b border-zinc-700 mt-2"></div>

          <p className="font-dm-sans text-[14px] text-gray-400 mt-2 leading-7">
            {singleProduct.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            {checkIfProductExists(singleProduct.id) ? (
              <>
                {/* Quantity */}
                <div className="h-14 px-5 rounded-2xl border border-zinc-700 bg-[#111111] flex items-center justify-between">
                  <span className="text-zinc-400 text-sm font-medium">
                    In cart:
                  </span>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => decreaseQuantity(singleProduct.id)}
                      className="w-9 h-9 rounded-full border border-zinc-700 hover:bg-zinc-800 flex items-center justify-center cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-white text-lg font-semibold">
                      {quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(singleProduct.id)}
                      className="w-9 h-9 rounded-full border border-zinc-700 hover:bg-zinc-800 flex items-center justify-center cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Added + Wishlist */}
                <div className="flex gap-4">
                  <button
                    disabled
                    className="flex-1 h-12 rounded-[14px] bg-[#0F2D18] border border-[#1D5C33] text-[#4ADE80] font-semibold flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Check size={18} />
                    Added to Cart
                  </button>

                  <button
                    onClick={() => toggleFavorite(singleProduct.id)}
                    className={`w-14 rounded-xl border border-zinc-700 flex justify-center items-center cursor-pointer ${
                      singleProduct.liked
                        ? "bg-[#2B1717] text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={22}
                      fill={singleProduct.liked ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                {/* View Cart */}
                <button
                  onClick={() => setCartDrawer(true)}
                  className="h-12 rounded-[14px] border border-zinc-700 text-white hover:bg-zinc-800 transition cursor-pointer"
                >
                  View Cart →
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(singleProduct)}
                  className="flex-1 h-12 rounded-[14px] bg-[#C8FF00] text-black font-semibold flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleFavorite(singleProduct.id)}
                  className={`w-14 rounded-xl border border-zinc-700 flex justify-center items-center cursor-pointer ${
                    singleProduct.liked
                      ? "bg-[#2B1717] text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={22}
                    fill={singleProduct.liked ? "currentColor" : "none"}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="border h-21.5 flex flex-col items-center justify-center border-zinc-700 rounded-[18px] p-4 text-center">
              <Truck className="mx-auto text-lime-400" size={18} />

              <h4 className="font-dm-sans font-semibold text-[11px] mt-0.5">
                Free Delivery
              </h4>

              <p className="font-dm-sans text-[10px] text-gray-400 mt-1">
                On orders above ₹499
              </p>
            </div>

            <div className="border h-21.5 flex flex-col items-center justify-center border-zinc-700 rounded-[18px] p-4 text-center">
              <ShieldCheck className="mx-auto text-lime-400" size={18} />

              <h4 className="font-dm-sans text-[11px] mt-0.5">Secure Pay</h4>

              <p className="font-dm-sans text-[10px] text-gray-400 mt-1">
                SSL Protected
              </p>
            </div>

            <div className="border h-21.5 flex flex-col items-center justify-center border-zinc-700 rounded-[18px] p-4 text-center">
              <RotateCcw className="mx-auto text-lime-400" size={18} />

              <h4 className="font-dm-sans text-[11px] mt-0.5">Easy Returns</h4>

              <p className="font-dm-sans text-[10px] text-gray-400 mt-1">
                30 Day Warranty
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-6">
            {Number(id) > 1 && (
              <button
                onClick={previousProduct}
                className="flex-1 h-11.5 rounded-xl bg-[#242424] flex justify-center items-center gap-2 text-white border border-[#3B3B3B] font-dm-sans text-[14px] font-semibold hover:bg-[#2F2F2F] duration-200 cursor-pointer"
              >
                <ChevronLeft size={18} />
                Previous
              </button>
            )}

            {Number(id) < products.length && (
              <button
                onClick={nextProduct}
                className={`${
                  Number(id) > 1 ? "flex-1" : "w-full"
                } h-11.5 rounded-xl bg-[#C8FF00] text-black font-dm-sans text-[14px] font-semibold flex justify-center items-center gap-2 hover:bg-[#D4FF2F] duration-200 cursor-pointer`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Related Products */}
      <div className="mt-20">
        <h2 className="font-syne text-[36px] font-bold text-white mb-8">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products
            .filter(
              (item) =>
                item.id !== singleProduct.id &&
                item.category === singleProduct.category,
            )
            .slice(0, 5)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
