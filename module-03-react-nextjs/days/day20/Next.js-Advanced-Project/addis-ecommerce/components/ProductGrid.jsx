'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import ProductCard from './ProductCard'
import { fetcher } from '@/lib/fetcher'

// The search box and the product cards.
// "initialProducts" were already loaded on the server, so the page shows
// products straight away - no spinner on arrival.
export default function ProductGrid({ initialProducts, category }) {
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')

  // Debounce: only use the text after the person stops typing for 400 ms.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(text.trim()), 400)
    return () => clearTimeout(timer) // typing again cancels the old timer
  }, [text])

  const url = `/api/products?search=${encodeURIComponent(search)}&category=${category}`

  const { data, isLoading } = useSWR(url, fetcher, {
    // With no search text we already have the answer from the server.
    fallbackData: search === '' ? initialProducts : undefined,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  const products = data || []

  return (
    <div>
      <input
        className="search-box"
        type="search"
        placeholder="Search products, for example macbook or gaming"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p className="result-count">
        {isLoading ? 'Searching...' : `${products.length} products`}
      </p>

      {products.length === 0 && !isLoading ? (
        <p>No products match your search.</p>
      ) : (
        <div className="cards">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}