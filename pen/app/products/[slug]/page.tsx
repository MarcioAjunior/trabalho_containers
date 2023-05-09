"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { Store } from "utils/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface produto {
  name: string;
  mark: string;
  price: number;
  image: string;
  description: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState({} as produto);
  const router = useRouter();
  const { state, dispatch }: any = useContext(Store);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/products/${params.slug}`)
        .then((res) => {
          setProduct(res.data.product);
        })
        .catch((err) => toast.error("Produto não encontrado"));
    }, 250);
  }, [params.slug]);

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x: any) => x.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <>
      <main className="container m-auto mt-4 px-4">
        <div className="py-2">
          <Link href="/">Ver outras canetas</Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={"/assets/caneta_1.jpg"} //product.image
              alt={product.name}
              width={500}
              height={200}
            ></Image>
          </div>
          <div className="d:col-span-1">
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Marca: {product.mark}</li>
              <li>Descrição: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Preço</div>
                <div>R$ {product.price}</div>
              </div>

              <button
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
