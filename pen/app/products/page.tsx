"use client";
import ProductItem from "@elements/ProductItem";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "utils/store";

export default function Page() {
  const { state, dispatch }: any = useContext(Store);
  const { cart } = state;
  const [products, setProducts] = useState([]);

  const addToCartHandler = async (product: any) => {
    const existItem = cart.cartItems.find((x: any) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Produto adicioando ao carrinho");
  };

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:3000/api/products")
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }, 120);
  }, []);

  return (
    <main className="container m-auto mt-4 px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((prod: any) => {
          return (
            <ProductItem
              product={prod}
              key={prod.slug}
              addToCartHandler={addToCartHandler} //addToCartHandler
            ></ProductItem>
          );
        })}
      </div>
    </main>
  );
}
