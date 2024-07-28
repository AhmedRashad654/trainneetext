"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app, db } from "../config";
import { useRouter } from "next/navigation";
import { collection, onSnapshot } from "firebase/firestore";

const ContextUser = createContext();

function ContextProvider({ children }) {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth(app);

  ///////auth user//////
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/signin");
      }
      return () => unSubscribe();
    });
  }, [auth, router]);
  /////category///////
  useEffect(() => {
    const refCat = collection(db, "category");

    const unSubscribe = onSnapshot(refCat, (snapshot) => {
      if (!snapshot.empty) {
        let cat = [];
        snapshot.forEach((doc) => cat.push({ ...doc.data(), id: doc.id }));
        setCategory(cat);
      } else {
        setCategory([]);
      }
    });
    return () => unSubscribe();
  }, [setCategory]);
  ///////////product///////
  useEffect(() => {
    let unSubscribers = [];
    category.forEach((cat) => {
      const refProduct = collection(db, "category", cat.id, "product");
      const unSubscribe = onSnapshot(refProduct, (snapshot) => {
        if (!snapshot.empty) {
          let pro = [];
          snapshot.forEach((doc) => pro.push({ ...doc.data(), id: doc.id }));
          setProduct((prevProducts) => {
            const updatedProducts = prevProducts.filter(
              (product) => product.categoryId !== cat.id
            );
            return [...updatedProducts, ...pro];
          });
        } else {
          setProduct((prevProducts) =>
            prevProducts.filter((product) => product.categoryId !== cat.id)
          );
        }
      });

      unSubscribers.push(unSubscribe);
    });

    return () => {
      unSubscribers.forEach((unSubscribe) => unSubscribe());
    };
  }, [category]);

  return (
    <ContextUser.Provider
      value={{
        confirmationResult,
        setConfirmationResult,
        user,
        auth,
        category,
        product,
        setProduct,
        setCategory,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
}

function useUser() {
  const context = useContext(ContextUser);
  if (context === undefined) {
    throw new Error("proplem in context");
  }
  return context;
}
export { ContextProvider, ContextUser, useUser };
