import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const products = useSelector((state) => state.products.products)

  return (
    <div>
      <h1>Bazeena Wardrobe</h1>
      <p>Total Products: {products.length}</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - PKR {product.price}</li>
        ))}
      </ul>
    </div>
  )
}
