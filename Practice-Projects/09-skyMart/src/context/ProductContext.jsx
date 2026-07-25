import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Product = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cartDrawer, setCartDrawer] = useState(false);
  // Fetch all products
  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      // Add liked property to every product
      const updatedProducts = response.data.map((product) => ({
        ...product,
        liked: false,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Get single product from existing products
  useEffect(() => {
    if (products.length > 0 && singleProduct.id) {
      const updated = products.find((item) => item.id === singleProduct.id);

      if (updated) {
        setSingleProduct(updated);
      }
    }
  }, [products]);

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
    if (checkIfProductExists(product.id)) return;

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
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
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    toast.success("Order Placed Successfully (Demo)");
    setCart([]);
    setCartDrawer(false);
  };

  // Favourite
  const toggleFavorite = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, liked: !item.liked } : item,
      ),
    );

    setSingleProduct((prev) =>
      prev.id === productId ? { ...prev, liked: !prev.liked } : prev,
    );
  };

  const sortProducts = () => {
    return  products.sort((a, b) => b.rating.rate - a.rating.rate);
  };

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

        sortProducts
      }}
    >
      {children}
    </Product.Provider>
  );
};
