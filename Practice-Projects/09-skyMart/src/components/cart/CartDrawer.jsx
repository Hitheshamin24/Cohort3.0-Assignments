import React, { useContext } from "react";
import { ShoppingBag, Package, X } from "lucide-react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import { Product } from "../../context/ProductContext";

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, cartDrawer, setCartDrawer, clearCart, placeOrder, cartTotal } =
    useContext(Product);

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={() => setCartDrawer(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
          cartDrawer ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full sm:max-w-md max-w-full flex-col border-l border-zinc-700 bg-[#101010] transition-transform duration-500 ${
          cartDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-lime-400" />

            <h2 className="font-syne text-[18px] font-bold text-white">Cart</h2>

            {cart.length > 0 && (
              <span className="rounded-full bg-lime-400/15 px-3 py-1 font-dm-sans text-[12px] text-lime-400">
                {cart.length} Items
              </span>
            )}
          </div>

          <button
            onClick={() => setCartDrawer(false)}
            className="transition hover:rotate-90"
          >
            <X size={18} className="text-zinc-500" />
          </button>
        </div>

        {/* Empty Cart */}

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-800">
              <Package size={36} className="text-zinc-500" />
            </div>

            <h2 className="mt-6 font-syne text-[18px] font-bold text-white">
              Cart is Empty
            </h2>

            <p className="mt-2 font-dm-sans text-[14px] text-zinc-500">
              Go shop something cool!
            </p>

            <button
              onClick={() => {
                navigate("/products");
                setCartDrawer(false);
              }}
              className="mt-8 rounded-2xl bg-lime-400 px-8 py-4 font-dm-sans text-[14px] font-medium text-black transition hover:bg-lime-300 cursor-pointer"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Footer */}

            <div className="border-t border-zinc-700 p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-dm-sans text-[14px] text-zinc-400">
                  Total
                </span>

                <h2 className="font-syne text-[24px] font-bold text-white">
                  ${cartTotal.toFixed(2)}
                </h2>
              </div>

              <button
                onClick={() => placeOrder()}
                className="w-full rounded-2xl bg-lime-400 py-4 font-syne text-[16px] font-bold text-black transition hover:bg-lime-300 cursor-pointer"
              >
                Checkout →
              </button>

              <button
                onClick={() => clearCart()}
                className="mt-5 w-full font-dm-sans text-[12px] text-zinc-500 transition hover:text-red-400 cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
