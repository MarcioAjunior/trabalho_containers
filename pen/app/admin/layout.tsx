import Link from "next/link";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div>
      <main className="container m-auto mt-4 px-4">
        <div>
          <ul className="grid grid-rows-1 grid-flow-col gap-4">
            <li className="text-center">
              <Link href="/admin/dashboard" className="font-bold">
                Dashboard
              </Link>
            </li>
            <li className="text-center">
              <Link href="/admin/orders" className="font-bold">
                Compras
              </Link>
            </li>
            <li className="text-center">
              <Link href="/admin/produtos" className="font-bold">
                Produtos
              </Link>
            </li>
          </ul>
        </div>
      </main>
      {children}
    </div>
  );
}
