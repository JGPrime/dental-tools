"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import ProductDashboard from "@/components/ProductDashboard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct(product: Product) {
    setProducts((currentProducts) => [...currentProducts, product]);
  }

  function removeProduct(productId: number) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  }

  function updateProduct(
    productId: number,
    updatePrice: number
  ) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, price: updatePrice } : product
      )
    );
  }

  return (
    <main>
      <h1>Dental Tools</h1>

      <ProductDashboard products={products} />
      
      <ProductForm 
        onAddProduct={addProduct}
      />

      <ProductList 
        products={products} 
        onRemoveProduct={removeProduct}
        updateProduct={updateProduct}
      />
    </main>
    
  );
}
