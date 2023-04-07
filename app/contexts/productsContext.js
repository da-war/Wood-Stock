import React from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductContext = React.createContext("");

const ProductProvider = ({ children }) => {
  const [products, setProducts] = React.useState([]);
  const [loadProducts, setLoadProducts] = React.useState(false);

  const getProducts = async () => {
    setLoadProducts(true);
    try {
      const colRef = collection(db, "products");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });

      setProducts(myData);
      AsyncStorage.setItem("products", JSON.stringify(myData));
      setLoadProducts(false);
    } catch (error) {
      console.log(error);
      setLoadProducts(false);
    }
  };

  React.useLayoutEffect(() => {
    getProducts();
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", products);
    }, 6000);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loadProducts,
        setLoadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
