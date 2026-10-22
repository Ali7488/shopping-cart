import { useEffect, useState } from "react";
import { sampleProducts } from "../data/sampleProducts";

const REQUEST_TIMEOUT_MS = 8000;

function isUsableCatalogue(products) {
  return (
    Array.isArray(products) &&
    products.length > 0 &&
    new Set(products.map((product) => product?.id)).size === products.length &&
    products.every(
      (product) =>
        product &&
        (typeof product.id === "number" || typeof product.id === "string") &&
        typeof product.title === "string" &&
        product.title.trim().length > 0 &&
        Number.isFinite(product.price) &&
        product.price >= 0 &&
        typeof product.image === "string" &&
        product.image.length > 0 &&
        Number.isFinite(product.rating?.rate) &&
        product.rating.rate >= 0 &&
        product.rating.rate <= 5,
    )
  );
}

export function useShopApi() {
  const [attempt, setAttempt] = useState(0);
  const [catalogue, setCatalogue] = useState({
    products: [],
    loading: true,
    error: null,
    usingSampleProducts: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Product request failed");
        const products = await response.json();
        if (!isUsableCatalogue(products)) throw new Error("Invalid product catalogue");
        if (active) {
          setCatalogue({ products, loading: false, error: null, usingSampleProducts: false });
        }
      } catch (error) {
        if (active) {
          setCatalogue({
            products: sampleProducts,
            loading: false,
            error,
            usingSampleProducts: true,
          });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    fetchProducts();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  function retry() {
    setCatalogue((current) => ({ ...current, loading: true }));
    setAttempt((current) => current + 1);
  }

  return { ...catalogue, retry };
}
