import Link from "next/link";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div>
      <main className="container m-auto mt-4 px-4">
        <div>
          <ul>
            <li className="content-center">
              <Link href="/admin/dashboard" className="font-bold">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">Compras</Link>
            </li>
            <li>
              <Link href="/admin/products">Produtos</Link>
            </li>
          </ul>
        </div>
      </main>
      <div className="md:col-span-3">{children}</div>
    </div>
  );
}
