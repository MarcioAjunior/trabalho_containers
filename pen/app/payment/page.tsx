"use client";
import React, { useContext, useState } from "react";
//@ts-ignore
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Store } from "utils/store";
import { useRouter } from "next/navigation";
import CheckoutWizard from "@elements/CheckoutWizard";

export default function Page() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch }: any = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  const submitHandler = (e: Event) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Método de pagamento é obrigatório");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/finalized");
  };

  return (
    <div>
      <main className="container m-auto mt-4 px-4">
        <CheckoutWizard activeStep={1} />
        {/* @ts-ignore */}
        <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
          <h1 className="mb-4 text-xl">Payment Method</h1>
          {["Stripe", "Boleto"].map((payment) => (
            <div key={payment} className="mb-4">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />

              <label className="p-2" htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className="mb-4 flex justify-between">
            <button className="primary-button">Próximo</button>
          </div>
        </form>
      </main>
    </div>
  );
}
