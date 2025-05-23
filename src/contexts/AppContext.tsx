"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface AppContextType {
  router: any;
  isAdmin: boolean;
  getToken: () => Promise<string | null>;
  setIsAdmin: (value: boolean) => void;
  userData: boolean;
  products: any[];
  cartItems: any;
  setCartItems: (items: any) => void;
}

export const AppContext = createContext<AppContextType>({
  router: null,
  isAdmin: false,
  setIsAdmin: () => {},
  userData: false,
  getToken: async () => null,
  products: [],
  cartItems: {},
  setCartItems: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [userData, setUserData] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Record<string, any>>({});

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchUserData = async () => {
    try {
      if (user?.publicMetadata?.role === "admin") {
        setIsAdmin(true);
      }

      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user?.cartItems);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const value: AppContextType = {
    router,
    getToken,
    isAdmin,
    setIsAdmin,
    userData,
    products,
    cartItems,
    setCartItems,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
