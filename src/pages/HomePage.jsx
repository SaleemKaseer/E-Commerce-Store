import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'
import { useCart } from '../context/CartContext'

function HomePage() {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) throw new Error(`Request failed: ${response.status}`)
                const data = await response.json()
                setProducts(data)
            } catch (err) {
                console.error('Error fetching products:', err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) return <p className="p-8 text-center text-gray-600">Loading products...</p>
    if (error) return <p className="p-8 text-center text-red-600">Error loading products.</p>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        price={p.price}
                        image={p.image}
                        onAddToCart={() => addToCart(p)}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage
