import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const Product = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartDrawer, setCartDrawer] = useState(false);
  console.log(cart);
  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const checkIfProductExists = (productId) => {
    return cart.some((item) => item.id === productId);
  };
  const addToCart = (product) => {
    if (checkIfProductExists(product.id)) {
      return;
    }

    setCart((prev) => [...prev, product]);
    setCartDrawer(true);
  };
  return (
    <Product.Provider
      value={{
        products,
        getProducts,
        cart,
        addToCart,
        cartDrawer,
        setCartDrawer,
        checkIfProductExists
      }}
    >
      {children}
    </Product.Provider>
  );
};
