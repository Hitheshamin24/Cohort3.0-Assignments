import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "./AuthContext";
import { Check, X } from "lucide-react";

export const Product = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cartDrawer, setCartDrawer] = useState(false);
  const { loggedInUser } = useContext(Auth);

  useEffect(() => {
    if (loggedInUser?.id) {
      const storedCart = localStorage.getItem(`sm_cart_${loggedInUser.id}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser?.id) {
      localStorage.setItem(`sm_cart_${loggedInUser.id}`, JSON.stringify(cart));
    }
  }, [cart, loggedInUser]);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      const likedProducts = loggedInUser?.id
        ? JSON.parse(localStorage.getItem(`sm_liked_${loggedInUser.id}`)) || []
        : [];
      const updatedProducts = response.data.map((product) => ({
        ...product,
        liked: likedProducts.includes(product.id),
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [loggedInUser]);

  useEffect(() => {
    if (products.length > 0 && singleProduct.id) {
      const updated = products.find((item) => item.id === singleProduct.id);

      if (updated) {
        setSingleProduct(updated);
      }
    }
  }, [products, singleProduct.id]);

  const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`,
      );

      const likedProduct = products.find(
        (item) => item.id === Number(productId),
      );

      setSingleProduct({
        ...response.data,
        liked: likedProduct?.liked ?? false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Cart
  const checkIfProductExists = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const addToCart = (product) => {
    if (checkIfProductExists(product.id)) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      toast.success("quantity Updated", {
        icon: (
          <div className="w-6 h-6 rounded-full bg-[#e2ff66] flex items-center justify-center">
            <Check className="w-4 h-4 text-black" strokeWidth={3} />
          </div>
        ),
      });
      setCartDrawer(true);

      return;
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);

    toast.success("Added to cart", {
      icon: (
        <div className="w-6 h-6 rounded-full bg-[#9ae600] flex items-center justify-center">
          <Check className="w-4 h-4 text-black" strokeWidth={3} />
        </div>
      ),
    });

    setCartDrawer(true);
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success("Removed from cart", {
      icon: (
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
          <X className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      ),
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    toast.success("Order Placed Successfully (Demo)", {
      icon: (
        <div className="w-6 h-6 rounded-full bg-[#e2ff66] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-black" strokeWidth={3} />
        </div>
      ),
    });
    setCart([]);
    setCartDrawer(false);
  };

  // Favourite
  const toggleFavorite = (productId) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((item) =>
        item.id === productId ? { ...item, liked: !item.liked } : item,
      );

      const likedIds = updatedProducts
        .filter((item) => item.liked)
        .map((item) => item.id);

      if (loggedInUser?.id) {
        localStorage.setItem(
          `sm_liked_${loggedInUser.id}`,
          JSON.stringify(likedIds),
        );
      }

      return updatedProducts;
    });

    setSingleProduct((prev) =>
      prev.id === productId ? { ...prev, liked: !prev.liked } : prev,
    );
  };
  const sortProducts = () => {
    let sortedProducts = [...products];
    sortedProducts = sortedProducts.sort(
      (a, b) => b.rating.rate - a.rating.rate,
    );
    return sortedProducts;
  };

  const cartTotal = Number(
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
  );
  const categoriesList = [...new Set(products.map((p) => p.category))];
  const topProductsCount = products.filter(
    (p) => p.rating && p.rating.rate >= 4.5,
  ).length;
 
  return (
    <Product.Provider
      value={{
        products,
        singleProduct,
        cart,
        cartDrawer,

        getProducts,
        getSingleProduct,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
        clearCart,
        placeOrder,

        checkIfProductExists,

        toggleFavorite,
        setCartDrawer,

        sortProducts,

        cartTotal,
        categoriesList,
        topProductsCount,
      }}
    >
      {children}
    </Product.Provider>
  );
};
