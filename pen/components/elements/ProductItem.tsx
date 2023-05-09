/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

//@ts-ignore
export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`} legacyBehavior>
        <a>
          <img
            src={product.image || "/assets/caneta_1.jpg"}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/products/${product.slug}`} legacyBehavior>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>R${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
