"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Store } from "utils/store";
//@ts-ignore
import { XCircleIcon } from "@heroicons/react/outline";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const { state, dispatch }: any = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item: any) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item: any, qty: number) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };

  const saveCar = () => {
    axios
      .post("http://localhost:3000/api/cart", state)
      .then(() => {
        toast.success("Carrinho cadastrado com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
  };

  return (
    <main className="container m-auto mt-4 px-4">
      <div>
        {cartItems.length === 0 ? (
          <div>
            Sem caneta ?. <Link href="/products">Escolha sua caneta</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full ">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Caneta(s)</th>
                    <th className="p-5 text-right">Quantidade</th>
                    <th className="p-5 text-right">Preço</th>
                    <th className="p-5">Remover ?</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: any) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link href={`/products/${item.slug}`} legacyBehavior>
                          <a className="flex items-center">
                            <Image
                              src={item.image || "/assets/caneta_1.jpg"}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            //@ts-ignore
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">R${item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Valor total R$ :
                    {cartItems.reduce(
                      (a: any, c: any) => a + c.quantity * c.price,
                      0
                    )}
                  </div>
                </li>
                <li>
                  <button onClick={saveCar} className="primary-button w-full">
                    Finalizar compra !
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
