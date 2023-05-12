"use client";
import Link from "next/link";
import React, { useReducer } from "react";

export default function Page() {
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          products: action.payload,
          error: "",
        };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      case "CREATE_REQUEST":
        return { ...state, loadingCreate: true };
      case "CREATE_SUCCESS":
        return { ...state, loadingCreate: false };
      case "CREATE_FAIL":
        return { ...state, loadingCreate: false };
      case "DELETE_REQUEST":
        return { ...state, loadingDelete: true };
      case "DELETE_SUCCESS":
        return { ...state, loadingDelete: false, successDelete: true };
      case "DELETE_FAIL":
        return { ...state, loadingDelete: false };
      case "DELETE_RESET":
        return { ...state, loadingDelete: false, successDelete: false };

      default:
        state;
    }
  }

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  return (
    <main className="container m-auto mt-4 px-4">
      <div className="overflow-x-auto md:col-span-3">
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl">Produtos</h1>
          {loadingDelete && <div>Deleting item...</div>}
          <button
            disabled={loadingCreate}
            onClick={() => null} //createHandler
            className="primary-button"
          >
            {loadingCreate ? "Loading" : "Create"}
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">NAME</th>
                  <th className="p-5 text-left">PRICE</th>
                  <th className="p-5 text-left">CATEGORY</th>
                  <th className="p-5 text-left">COUNT</th>
                  <th className="p-5 text-left">RATING</th>
                  <th className="p-5 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product._id} className="border-b">
                    <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                    <td className=" p-5 ">{product.name}</td>
                    <td className=" p-5 ">${product.price}</td>
                    <td className=" p-5 ">{product.category}</td>
                    <td className=" p-5 ">{product.countInStock}</td>
                    <td className=" p-5 ">{product.rating}</td>
                    <td className=" p-5 ">
                      <Link
                        href={`/admin/produtos/${product.slug}`}
                        type="button"
                        className="default-button"
                      >
                        Edit
                      </Link>
                      &nbsp;
                      <button
                        onClick={() => null} //deleteHandler(product._id)
                        className="default-button"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
