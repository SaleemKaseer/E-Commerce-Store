import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import { useCart } from '../context/CartContext'

function HomePage() {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Bumped by "Try Again" to re-run the fetch
    const [retryCount, setRetryCount] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) throw new Error('Failed to load products')
                const data = await response.json()
                setProducts(data)
            } catch (err) {
                console.error('Error fetching products:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [retryCount])

    function handleRetry() {
        setError(null)
        setLoading(true)
        setRetryCount((count) => count + 1)
    }

    function handleSearch(event) {
        setSearchTerm(event.target.value.toLowerCase())
    }

    function handleFilterChange(event) {
        setSelectedCategory(event.target.value)
    }

    if (loading) return <Spinner label="Loading products..." />
    if (error) return <ErrorMessage message="Error loading products. Please try again." onRetry={handleRetry} />

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm)
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true

        return matchesSearch && matchesCategory
    })

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Product List</h1>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-1 py-2 px-3 rounded border border-gray-300 bg-white focus:outline-none focus:border-teal-600"
                />
                <select
                    value={selectedCategory}
                    onChange={handleFilterChange}
                    className="py-2 px-3 rounded border border-gray-300 bg-white focus:outline-none focus:border-teal-600"
                >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>
            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-600">No products match your search.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((p) => (
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
            )}
        </div>
    )
}

export default HomePage
