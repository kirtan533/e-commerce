"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`wishlist_${user.uid}`);
      setWishlist(stored ? JSON.parse(stored) : []);
    } else {
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => String(item.id) === String(product.id),
      );

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
