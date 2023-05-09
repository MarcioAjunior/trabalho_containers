"use client";
import CheckoutWizard from "@elements/CheckoutWizard";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Store } from "utils/store";

export default function Page() {
  const { state, dispatch }: any = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const [loading, setLoading] = useState(false);

  //@ts-ignore
  const round = (num: Number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round(
    cartItems.reduce((a: any, c: any) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const placeOrderHandler = async () => {
    setLoading(true);
    alert("Relizar pagamento");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <main className="container m-auto mt-4 px-4">
      <CheckoutWizard activeStep={2} />
      <h1 className="mb-4 text-xl">Finazando a compra</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/products">Buscar por canetas</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Metodo de pagamento</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item(s)</th>
                    <th className="    p-5 text-right">Quantidade</th>
                    <th className="  p-5 text-right">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: any) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`} legacyBehavior>
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
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Alterar</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Resumo</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>R${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? "Loading..." : "Finalizar compra"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
