import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "./AuthContext";

export const Product = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cartDrawer, setCartDrawer] = useState(false);
  const { loggedInUser } = useContext(Auth);

  useEffect(() => {
    if (loggedInUser?.fullName) {
      const storedCart = localStorage.getItem(`sm_cart_${loggedInUser.fullName}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]); 
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser?.fullName) {
      localStorage.setItem(`sm_cart_${loggedInUser.fullName}`, JSON.stringify(cart));
    }
  }, [cart, loggedInUser]);
  
  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

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
    toast.success("Added to cart");
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
    toast.success("Removed from cart");
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
    let sortedProducts = [...products];
    sortedProducts = sortedProducts.sort(
      (a, b) => b.rating.rate - a.rating.rate,
    );
    return sortedProducts;
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const categoriesList = [...new Set(products.map(p => p.category))];
  const topProductsCount = products.filter(p => p.rating && p.rating.rate >= 4.5).length;

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
