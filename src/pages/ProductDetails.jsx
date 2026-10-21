import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductDetails() {
    const { addToCart } = useCart()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                return res.json()
            })
            .then((data) => setProduct(data))
            .catch((err) => {
                console.error('Error fetching product:', err)
                setError(err)
            })
    }, [id])

    if (error) return <p className="p-8 text-center text-red-600">Error loading product.</p>
    // Also show loading while switching from one product to another
    if (!product || String(product.id) !== id) return <p className="p-8 text-center text-gray-600">Loading...</p>

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
                        onClick={() => addToCart(product)}
                        className="mt-6 py-2 px-6 rounded bg-teal-600 text-white hover:bg-teal-700"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
