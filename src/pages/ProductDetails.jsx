import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'

function ProductDetails() {
    const { addToCart } = useCart()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    // Remembers which product id failed, so the error doesn't stick when switching products
    const [error, setError] = useState(null)
    // Bumped by "Try Again" to re-run the fetch
    const [retryCount, setRetryCount] = useState(0)
    // Briefly true after clicking "Add to Cart", to show the "Added" feedback
    const [justAdded, setJustAdded] = useState(false)

    // Switch the button back to "Add to Cart" after a moment
    useEffect(() => {
        if (!justAdded) return
        const timer = setTimeout(() => setJustAdded(false), 1200)
        return () => clearTimeout(timer)
    }, [justAdded])

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                if (!response.ok) throw new Error('Failed to load product')
                const data = await response.json()
                setProduct(data)
            } catch (err) {
                console.error('Error fetching product:', err)
                setError({ id, message: err.message })
            }
        }

        fetchProduct()
    }, [id, retryCount])

    function handleRetry() {
        setError(null)
        setRetryCount((count) => count + 1)
    }

    if (error && error.id === id) {
        return <ErrorMessage message="Error loading product. Please try again." onRetry={handleRetry} />
    }
    // Also show loading while switching from one product to another
    if (!product || String(product.id) !== id) return <Spinner label="Loading product..." />

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link to="/" className="text-teal-700 hover:underline">← Back to products</Link>
            <div className="mt-4 p-6 bg-white rounded-lg shadow flex flex-col md:flex-row gap-8">
                <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mx-auto" />
                <div className="flex-1">
                    <p className="text-sm uppercase text-gray-500">{product.category}</p>
                    <h1 className="text-2xl font-bold text-gray-800 mt-1">{product.title}</h1>
                    <p className="text-gray-600 mt-4">{product.description}</p>
                    <p className="text-2xl text-blue-600 font-semibold mt-4">${product.price.toFixed(2)}</p>
                    <button
                        onClick={() => {
                            addToCart(product)
                            setJustAdded(true)
                        }}
                        className={`mt-6 py-2 px-6 rounded text-white transition duration-200 active:scale-90 ${
                            justAdded ? 'bg-green-600 scale-105' : 'bg-teal-600 hover:bg-teal-700'
                        }`}
                    >
                        {justAdded ? '✓ Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
